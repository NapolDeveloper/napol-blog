import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { HeadingItem, PostMatter } from '@/models/post';
import dayjs from 'dayjs';
import { CategoryDetail } from '@/models/category';

const BASE_PATH = 'src/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

/**
 * 특정 카테고리 또는 전체 디렉토리에서 모든 MDX 파일의 경로를 가져옵니다.
 * @param category 카테고리 이름 (선택적)
 * @returns MDX 파일 경로 배열
 */
export const getPostPaths = (category?: string): string[] => {
  const targetPath = category ? path.join(POSTS_PATH, category) : POSTS_PATH;

  if (!fs.existsSync(targetPath)) {
    throw new Error(`경로를 찾을 수 없습니다: ${targetPath}`);
  }

  const mdxPaths: string[] = [];

  const traverseDirectory = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // 디렉토리인 경우 재귀적으로 탐색
        traverseDirectory(fullPath);
      } else if (entry.isFile() && fullPath.endsWith('.mdx')) {
        // MDX 파일인 경우 경로 저장
        mdxPaths.push(fullPath);
      }
    }
  };

  traverseDirectory(targetPath);

  return mdxPaths;
};

/**
 * 카테고리명을 포맷팅된 문자열로 변환합니다.
 * @param category 카테고리명 (예: "tech", "deep_dive")
 * @returns 포맷팅된 카테고리명 (예: "Tech", "Deep Dive")
 */
export const parseCategoryName = (category: string): string => {
  return category
    .split('_') // 언더스코어를 기준으로 분리
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // 각 단어의 첫 글자를 대문자로
    .join(' '); // 단어를 공백으로 연결
};

/**
 * MDX 확장자인 포스트 파일을 파싱합니다.
 * @param postPath 포스트 경로
 * @return 포스트 객체
 */
const parsePost = async (postPath: string) => {
  const postInfo = parsePostInfo(postPath);
  const postDetail = await parsePostDetail(postPath);

  return {
    ...postInfo,
    ...postDetail,
  };
};

/**
 * 포스트의 상세 정보를 파싱합니다.
 * @param postPath 포스트 경로
 * @return 포스트 상세 정보 객체
 */
const parsePostDetail = async (postPath: string) => {
  const file = fs.readFileSync(postPath, 'utf8');
  const { data, content } = matter(file);
  const grayMatter = data as PostMatter;
  const dateString = dayjs(grayMatter.date).locale('ko').format('YYYY년 MM월 DD일');

  return {
    ...grayMatter,
    tag: grayMatter.tag ?? [],
    dateString,
    content,
  };
};

/**
 * 포스트의 추가 정보를 파싱합니다.
 * @param postPath 포스트 경로
 * @return 포스트 추가 정보 객체
 */
export const parsePostInfo = (postPath: string) => {
  const normalizedPath = postPath.split(path.sep).join('/');
  const filePath = normalizedPath
    .slice(normalizedPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}/`, '')
    .replace('.mdx', '');

  const [category, slug] = filePath.split('/');

  const url = `/blog/${category}/${slug}`;

  return { url, category, slug };
};

/**
 * 목차 데이터를 파싱합니다.
 * @param content mdx 컨텐츠
 */
export const parseToc = (content: string): HeadingItem[] => {
  const regex = /^(##|###) (.*$)/gim;
  const headingList = content.match(regex);
  return (
    headingList?.map((heading: string) => ({
      text: heading.replace('##', '').replace('#', ''),
      link:
        '#' +
        heading
          .replace('# ', '')
          .replace('#', '')
          .replace(/[\[\]:!@#$/%^&*()+=,.]/g, '')
          .replace(/ /g, '-')
          .toLowerCase()
          .replace('?', ''),
      indent: (heading.match(/#/g)?.length || 2) - 2,
    })) || []
  );
};

/**
 * 포스트 목록을 조회합니다.
 * @description category 값이 있다면 해당 카테고리 목록에 속한 포스트 목록을 조회합니다
 * @param category 카테고리명
 */
export const getPostList = async (category?: string) => {
  const postPaths = getPostPaths(category);
  const postList = await Promise.all(postPaths.map(postPath => parsePost(postPath)));

  // 최신글이 앞쪽에 오도록 정렬
  postList.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime(); // 날짜 기준 내림차순 정렬
  });

  return postList;
};

/**
 * 포스트 상세 내용을 조회합니다.
 */
export const getPostDetail = async (category: string, slug: string) => {
  const filePath = `${POSTS_PATH}/${category}/${slug}/content.mdx`;
  const detail = await parsePost(filePath);

  return detail;
};

/**
 * 카테고리 목록을 가져옵니다.
 * @return 배열 형태의 카테고리 목록
 */
export const getCategoryList = () => {
  if (!fs.existsSync(POSTS_PATH)) {
    throw new Error('경로에 게시물 X');
  }

  return fs.readdirSync(POSTS_PATH).filter(category => {
    const categoryPath = path.join(POSTS_PATH, category);
    return fs.statSync(categoryPath).isDirectory(); // 디렉토리인지 확인
  });
};

/**
 * 카테고리 상세 목록을 가져옵니다
 */
export const getCategoryDetailList = () => {
  const categoryList = getCategoryList();
  const detailList: CategoryDetail[] = [];

  categoryList.forEach(category => {
    detailList.push({
      parsedCategoryName: parseCategoryName(category),
      category: category,
    });
  });

  return detailList;
};

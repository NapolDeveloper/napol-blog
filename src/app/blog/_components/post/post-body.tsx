import { MDXRemote } from 'next-mdx-remote/rsc';
import { Post } from '@/models/post';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeToc from 'rehype-toc';

interface Props {
  post: Post;
}

export default function PostBody({ post }: Props) {
  return (
    <MDXRemote
      source={post.content}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkBreaks],
          rehypePlugins: [
            rehypeSlug,
            rehypePrettyCode,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            [
              rehypeToc,
              {
                headings: ['h1', 'h2', 'h3'], // 목차에 포함할 헤딩
              },
            ],
          ],
        },
      }}
    />
  );
}

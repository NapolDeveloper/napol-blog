export interface PostMatter {
  title: string;
  desc: string;
  date: Date;
  thumbnail: string;
}

export interface PostMetaData {
  dateString: string;
  category: string;
}

export interface PostInfoData {
  url: string;
  category: string; // 중복되는 속성은 자동으로 합쳐짐
  slug: string;
}

export interface Post extends PostMatter, PostMetaData, PostInfoData {
  content: string;
}

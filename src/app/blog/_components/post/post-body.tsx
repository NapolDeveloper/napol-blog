import { MDXRemote } from 'next-mdx-remote/rsc';
import { Post } from '@/models/post';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { MdxComponents } from '@/components/mdx';

interface Props {
  post: Post;
}

export default function PostBody({ post }: Props) {
  return (
    <MDXRemote
      source={post.content}
      components={MdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkBreaks],
          rehypePlugins: [rehypeSlug, rehypePrettyCode],
        },
      }}
    />
  );
}

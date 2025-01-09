import { ModeToggle } from '@/components/shared/mode-toggle';
import PostList from '../_components/post/post-list';

export default function BlogPage() {
  return (
    <>
      <PostList />
      <ModeToggle />
    </>
  );
}

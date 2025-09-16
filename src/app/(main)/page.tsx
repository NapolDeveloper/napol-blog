import MainPost from './_components/main-post';
import RecentPost from './_components/recent-post';

export default function MainPage() {
  return (
    <>
      <RecentPost />

      <div className="h-10 w-full" />

      <MainPost />
    </>
  );
}

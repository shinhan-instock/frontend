import PostList from '../../components/common/PostList';
import NavigationBar from '../../components/common/NavigationBar';

export default function MainPage() {
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="w-full max-w-2xl">
        <div className="sticky flex w-full max-w-2xl bg-white border-b border-zinc-300 z-10">
        <NavigationBar menuType="default" /> 
        </div>
      </div>

      <div className="p-5 w-full max-w-2xl overflow-auto flex-grow">
        <PostList />
      </div>
    </div>
  );
}

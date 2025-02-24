import PostList from "../../components/common/PostList";
import NavigationBar from "../../components/common/NavigationBar";
export default function MainPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="fixed w-full max-w-2xl bg-white border-b border-stroke-gray z-10">
        <NavigationBar />
      </div>

      <div className="p-5 w-full max-w-2xl mt-10">
        <PostList />
      </div>
    </div>
  );
}

import PostList from "../../components/common/PostList";
import NavigationBar from "../../components/common/NavigationBar";
export default function MainPage() {
  return (
    <div>
      <div className="fixed ">
        <NavigationBar />
      </div>
      <div className="p-10">
        {" "}
        <PostList />{" "}
      </div>
    </div>
  );
}

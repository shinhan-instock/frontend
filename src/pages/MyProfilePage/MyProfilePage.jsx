import { useState } from "react";
import Profile from "../../components/common/Profile";
import NavigationBar from "../../components/common/NavigationBar";
import PostList from "../../components/common/PostList";
import MyProfilePostsData from "./components/MyProfilePostsData";

export default function MyProfilePage() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [postsData, setPostsData] = useState([]);
  return (
    <div className="flex flex-col h-screen  items-center">
      <div className="sticky flex w-full justify-center">
        <Profile isMyProfile={true} />
      </div>
      <div className="w-4/5">
        <div className="sticky flex w-full  bg-white border-b border-zinc-300 z-10">
          <NavigationBar
            menuType="myprofile"
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </div>

      <div className="p-5 w-full max-w-2xl overflow-auto flex-grow pb-30">
        <MyProfilePostsData
          selectedTab={selectedTab}
          setPostsData={setPostsData}
        />
        <PostList postsData={postsData} />
      </div>
    </div>
  );
}

import { useState } from "react";
import Profile from "../../components/common/Profile";
import NavigationBar from "../../components/common/NavigationBar";
import PostList from "../../components/common/PostList";

export default function MyProfilePage() {
  const [selectedTab, setSelectedTab] = useState(1);
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

      <div className="p-5 w-full max-w-2xl overflow-auto flex-grow pb-20">
        <PostList />
      </div>
    </div>
  );
}

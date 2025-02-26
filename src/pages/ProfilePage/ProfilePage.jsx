import { useState } from "react";
import Profile from "../../components/common/Profile";
import NavigationBar from "../../components/common/NavigationBar";
import PostList from "../../components/common/PostList";

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky flex">
        <Profile isMyProfile={false} />
      </div>
      <div className="w-full max-w-2xl">
        <div className="sticky flex w-full max-w-2xl bg-white border-b border-zinc-300 z-10">
          <NavigationBar
            menuType="profile"
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

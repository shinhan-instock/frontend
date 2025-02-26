import { useState } from "react";
import PostList from "../../components/common/PostList";
import NavigationBar from "../../components/common/NavigationBar";
import PostCreate from "../MainPage/components/PostCreate";
export default function MainPage() {
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="sticky w-full m-auto">
        <PostCreate />
      </div>
      <div className="w-full max-w-2xl">
        <div className="sticky flex w-full max-w-2xl bg-white border-b border-zinc-300 z-10">
          <NavigationBar
            menuType="default"
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

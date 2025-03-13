import { useState } from "react";
import PostList from "../../components/common/PostList";
import NavigationBar from "../../components/common/NavigationBar";
import PostCreate from "../MainPage/components/PostCreate";
import MainPostsData from "./components/MainPostsData";
import { useLogin } from "../../hooks/useLogin";

export default function MainPage() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [postsData, setPostsData] = useState([]);
  const { userInfo } = useLogin();
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="sticky w-full flex flex-row justify-center">
        {userInfo && <PostCreate />}
      </div>
      <div className="w-4/5">
        {/* <div className="sticky flex w-full  bg-white border-b border-zinc-300 z-10"> */}
        <NavigationBar
          menuType="default"
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {/* </div> */}
      </div>

      <div className="p-5 w-5/6 overflow-auto flex-grow pb-30">
        <MainPostsData selectedTab={selectedTab} setPostsData={setPostsData} />
        <PostList postsData={postsData} />
      </div>
    </div>
  );
}

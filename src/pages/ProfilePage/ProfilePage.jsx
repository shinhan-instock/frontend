import { useState } from 'react';
import Profile from '../../components/common/Profile';
import NavigationBar from '../../components/common/NavigationBar';
import PostList from '../../components/common/PostList';
import ProfilePostsData from './components/ProfilePostsData';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [postsData, setPostsData] = useState([]);
  const params = useParams();

  return (
    <div className="flex flex-col h-screen items-center">
      <div className="sticky flex w-full justify-center">
        <Profile isMyProfile={false} userNickname={params.nickname} />
      </div>
      <div className="w-4/5">
        <div className="sticky flex w-full  bg-white border-b border-zinc-300 z-10">
          <NavigationBar
            menuType="profile"
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            nickname={params.nickname}
          />
        </div>

      </div>

      <div className="p-5 w-full max-w-2xl overflow-auto flex-grow pb-30">
        <ProfilePostsData
          selectedTab={selectedTab}
          setPostsData={setPostsData}
        />
        <PostList postsData={postsData} />
      </div>
    </div>
  );
}

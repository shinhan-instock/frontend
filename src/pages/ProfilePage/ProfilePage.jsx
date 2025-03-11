import { useState, useEffect } from "react";
import Profile from "../../components/common/Profile";
import NavigationBar from "../../components/common/NavigationBar";
import PostList from "../../components/common/PostList";
import ProfilePostsData from "./components/ProfilePostsData";
import { useParams } from "react-router-dom";
import StockList from "./components/StockList";
import { searchUser } from "../../api/UserAPI";
import { useLogin } from "../../hooks/useLogin";

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [postsData, setPostsData] = useState([]);
  const [userData, setUserData] = useState({});
  const params = useParams();
  const { userInfo } = useLogin();

  useEffect(() => {
    if (params.nickname != null) {
      searchUser(params.nickname).then((data) => {
        setUserData(data[0]);
      });
    } else {
      setUserData(userInfo);
    }
  }, [params.nickname, userInfo]);

  return (
    <div className="flex flex-col h-screen items-center">
      <div className="sticky flex w-full justify-center">
        <Profile
          isMyProfile={false}
          userNickname={params.nickname}
          userData={userData}
        />
      </div>
      <div className="w-4/5">
        <NavigationBar
          menuType="profile"
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          nickname={params.nickname}
        />
      </div>

      <div className="p-5 w-full max-w-2xl overflow-auto flex-grow pb-30">
        {selectedTab == 1 ? (
          <>
            {" "}
            <ProfilePostsData
              selectedTab={selectedTab}
              setPostsData={setPostsData}
              nickname={params.nickname}
            />
            <PostList postsData={postsData} />
          </>
        ) : (
          <StockList userId={userData.userId} />
        )}
      </div>
    </div>
  );
}

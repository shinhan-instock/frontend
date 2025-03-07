/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import userImg from "/img/userImg.png";
import { useLogin } from "../../hooks/useLogin";
import ImageMaker from "../../utils/ImageMaker";
import { searchUser } from "../../api/UserAPI";

export default function Profile({ isMyProfile, userNickname }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [userData, setUserData] = useState({});
  const { userInfo } = useLogin();

  useEffect(() => {
    if (!isMyProfile) {
      searchUser(userNickname).then((data) => {
        setUserData(data[0]);
      });
    } else {
      setUserData(userInfo);
    }
  }, []);

  return (
    <div className="flex flex-row items-start w-4/5  p-4 space-x-7">
      {userData.imageUrl !== null ? (
        <img src={userData.imageUrl} />
      ) : (
        <ImageMaker nickname={userData.nickname} />
      )}

      <div>
        <h2 className="text-2xl font-bold mb-2">{userData.nickname}</h2>
        <p className="text-gray-600">{userData.introduction}</p>
      </div>
      <button className="px-4 py-2 rounded-full font-medium text-sm transition-colors bg-gray-200 ">
        팔로잉
      </button>
      {!isMyProfile && (
        <button
          className={`px-4 py-2 rounded-full font-medium text-sm ${
            isFollowing ? "bg-gray-200 text-black" : "bg-blue-500 text-white"
          }`}
          onClick={() => setIsFollowing(!isFollowing)}
        >
          {isFollowing ? "팔로잉" : "팔로우"}
        </button>
      )}
      {/* 내프로필이 아닐때는 버튼 있음 */}
    </div>
  );
}

/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import userImg from '/img/userImg.png';
import { useLogin } from '../../hooks/useLogin';
import ImageMaker from '../../utils/ImageMaker';
import { searchUser, getFollowList, followUser } from '../../api/UserAPI';
import Modal from './Modal';

export default function Profile({ isMyProfile, userNickname }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [userData, setUserData] = useState({});
  const { userInfo } = useLogin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followList, setFollowList] = useState([]);

  useEffect(() => {
    if (!isMyProfile) {
      searchUser(userNickname).then((data) => {
        setUserData(data[0]);
      });
    } else {
      setUserData(userInfo);
    }
  }, []);

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const followList = await getFollowList();
        const isAlreadyFollowing = followList.some(
          (user) => user.nickname === userNickname
        );
        setIsFollowing(isAlreadyFollowing);
      } catch (error) {
        console.error('팔로우 상태 조회 실패:', error);
      }
    };

    if (!isMyProfile) {
      checkFollowStatus();
    }
  }, [userInfo, userNickname]);

  const handleFollow = async () => {
    try {
      await followUser(userNickname);
      setIsFollowing(true);
    } catch (error) {
      console.error('팔로우 실패:', error);
    }
  };

  const openFollowModal = async () => {
    try {
      const list = await getFollowList();
      setFollowList(list);
      setIsModalOpen(true);
    } catch (error) {
      console.error('팔로잉 리스트 불러오기 실패:', error);
    }
  };

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
      <button
        className="px-4 py-2 rounded-full font-medium text-sm transition-colors bg-gray-200 "
        onClick={openFollowModal}
      >
        팔로잉
      </button>
      {!isMyProfile && (
        <button
          className={`px-4 py-2 rounded-full font-medium text-sm ${
            isFollowing ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'
          }`}
          onClick={handleFollow}
          disabled={isFollowing}
        >
          {isFollowing ? '팔로잉' : '팔로우'}
        </button>
      )}
      {/* 내프로필이 아닐때는 버튼 있음 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-3">팔로잉 리스트</h2>
          {followList.length > 0 ? (
            <ul className="space-y-2">
              {followList.map((user) => (
                <li key={user.id} className="flex items-center space-x-3">
                  {user.image ? (
                    <img src={user.image} className="w-10 h-10 rounded-full" />
                  ) : (
                    <ImageMaker nickname={user.nickname} />
                  )}
                  <span>{user.nickname}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">팔로우한 사용자가 없습니다.</p>
          )}
        </div>
      </Modal>
    </div>
  );
}

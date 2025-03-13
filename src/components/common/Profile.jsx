import { useState, useEffect } from 'react';
import { useLogin } from '../../hooks/useLogin';
import ImageMaker from '../../utils/ImageMaker';
import { getFollowList, followUser, unfollowUser } from '../../api/UserAPI';
import Modal from './Modal';
import miniLogo from '/img/miniLogo.png';
import { useNavigate } from 'react-router-dom';

export default function Profile({ isMyProfile, userNickname, userData }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isInfluencer, setIsInfluencer] = useState(false);
  const { userInfo } = useLogin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followList, setFollowList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        if (!userInfo || !userInfo.nickname || !userNickname) {
          console.warn(
            '⚠️ 사용자 정보가 부족하여 팔로우 여부를 확인할 수 없습니다.'
          );
          return;
        }

        console.log('📢 팔로우 여부 확인 요청:', {
          myNickname: userInfo.nickname,
          target: userNickname,
        });

        const followList = await getFollowList(userInfo, userInfo.nickname);

        const isUserFollowing = followList.some(
          (user) => user.nickname === userNickname
        );

        setIsFollowing(isUserFollowing);
      } catch (error) {}
    };

    if (!isMyProfile) {
      checkFollowStatus();
    }
  }, [userInfo, userNickname]);

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        if (!userInfo.nickname) return;
        const followList = await getFollowList(userInfo.nickname);
        const isAlreadyFollowing = followList.some(
          (user) => user.nickname === userNickname
        );
        setIsFollowing(isAlreadyFollowing);
      } catch (error) {}
    };
    if (!isMyProfile) {
      checkFollowStatus();
    }
  }, [userInfo, userNickname]);

  const handleFollow = async () => {
    try {
      if (!userInfo || !userNickname) {
        return;
      }

      if (isFollowing) {
        await unfollowUser(userInfo, userNickname);

        setIsFollowing(false);
      } else {
        await followUser(userInfo, userNickname);

        setIsFollowing(true);
      }
    } catch (error) {}
  };

  const openFollowModal = async () => {
    const targetNickname = userNickname || userInfo.nickname;
    if (!targetNickname) {
      return;
    }

    try {
      const list = await getFollowList(userInfo, targetNickname);

      setFollowList(list);
      setIsModalOpen(true);
    } catch (error) {}
  };

  return (
    <div className="flex flex-row items-start w-4/5 p-4 space-x-7 mt-5 mb-4">
      {userData.imageUrl !== null ? (
        <img
          src={userData.imageUrl}
          className="rounded-full w-[50px] h-[50px]"
        />
      ) : (
        <ImageMaker nickname={userData.nickname} />
      )}

      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center">
          {userData.nickname}
          {isInfluencer && (
            <img
              src={miniLogo}
              className="w-6 h-6 ml-2"
              alt="Influencer Badge"
            />
          )}
        </h2>
        <p className="text-gray-600">{userData.introduction}</p>
      </div>
      <button
        className="px-4 py-2 rounded-full font-medium text-sm transition-colors bg-gray-200"
        onClick={openFollowModal}
      >
        팔로우
      </button>
      {!isMyProfile && (
        <button
          className={`px-4 py-2 rounded-full font-medium text-sm ${
            isFollowing ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'
          }`}
          onClick={handleFollow}
        >
          {isFollowing ? '언팔로잉' : '팔로우하기'}
        </button>
      )}
      {/* 팔로잉 리스트 모달 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-8">
            {userData.nickname}님의 팔로우 리스트
          </h2>
          {followList.length > 0 ? (
            <ul className="space-y-2">
              {followList.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center space-x-3"
                  onClick={() => navigate(`/profile/${user.nickname}`)}
                >
                  {user.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      className="w-[50px] h-[50px] rounded-full"
                    />
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

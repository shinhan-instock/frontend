/* eslint-disable react/prop-types */
import { HiChevronDown } from 'react-icons/hi';
import ImageMaker from '../../../utils/ImageMaker';
import { useNavigate } from 'react-router-dom';
import { checkInfluencerStatus } from '../../../api/UserAPI';
import miniLogo from '/img/miniLogo.png';
import { useState, useEffect } from 'react';

export default function ClosedProfile({
  userInfo,
  setIsMyInfoOpen,
  isMyInfoOpen,
}) {
  const navigate = useNavigate();
  const [isInfluencer, setIsInfluencer] = useState(false);

  useEffect(() => {
    async function fetchInfluencerStatus() {
      if (userInfo?.nickname) {
        const isUserInfluencer = await checkInfluencerStatus(userInfo.nickname);
        setIsInfluencer(isUserInfluencer);
      }
    }
    fetchInfluencerStatus();
  }, [userInfo]);
  return (
    <div className="flex justify-between p-4 border border-stroke-gray rounded-lg z-0 relative">
      <div className="flex flex-row space-x-3">
        {userInfo && userInfo.imageUrl ? (
          <img
            src={userInfo.imageUrl}
            alt="profile"
            className="w-14 h-14 rounded-full"
          />
        ) : (
          userInfo &&
          userInfo.nickname && <ImageMaker nickname={userInfo.nickname} />
        )}

        <div>
          {userInfo ? (
            <div className="flex flex-row ">
              <h2 className="flex flex-row text-lg font-semibold">
                {userInfo.nickname}
              </h2>
              <div className="flex justufy-center items-center">
                {isInfluencer && (
                  <img
                    src={miniLogo}
                    className="flex flex-row w-5 h-5 ml-1"
                    alt="Influencer Badge"
                  />
                )}
              </div>
            </div>
          ) : (
            <button className="flex px-5  " onClick={() => navigate('/login')}>
              로그인 하러가기
            </button>
          )}

          {userInfo && (
            <p className="text-gray-600 text-sm">{userInfo.introduction}</p>
          )}
        </div>
      </div>
      {userInfo && (
        <button
          className="w-10 h-10 flex items-center rounded-full hover:bg-instock-gray justify-center"
          onClick={() => setIsMyInfoOpen(!isMyInfoOpen)}
        >
          <HiChevronDown className="w-7 h-7 text-gray-600" />
        </button>
      )}
    </div>
  );
}

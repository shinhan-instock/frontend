/* eslint-disable react/prop-types */
import { HiChevronUp } from 'react-icons/hi';
import ImageMaker from '../../../utils/ImageMaker';
import { useNavigate } from 'react-router-dom';
import { checkInfluencerStatus } from '../../../api/UserAPI';
import miniLogo from '/img/miniLogo.png';
import { useState, useEffect } from 'react';

export default function OpenedProfile({
  userInfo,
  setIsMyInfoOpen,
  isMyInfoOpen,
  setIsLogoutOpen,
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
    <div className="flex flex-col p-4 border border-stroke-gray rounded-lg relative z-100">
      <div className="flex flex-row justify-between">
        <div className="flex">
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
          <div className="flex flex-col px-3">
            <div className="flex flex-row items-center">
              <h2 className="text-lg font-semibold">
                {userInfo ? userInfo.nickname : '로그인이 필요해요'}
              </h2>

              {isInfluencer && (
                <img
                  src={miniLogo}
                  className="w-5 h-5 ml-1"
                  alt="Influencer Badge"
                />
              )}
              
            </div>
            <p className="text-gray-600 text-sm">
              {userInfo ? userInfo.introduction : ''}
            </p>
          </div>
        </div>

        <button
          className="w-10 h-10 flex items-center rounded-full hover:bg-instock-gray justify-center"
          onClick={() => setIsMyInfoOpen(!isMyInfoOpen)}
        >
          <HiChevronUp className="w-7 h-7 text-gray-600" />
        </button>
      </div>
      <div className="flex flex-col p-4 mt-3 space-y-5">
        <p
          className="text-lg font-semibold cursor-pointer hover:text-stroke-gray"
          onClick={() => {
            navigate('/myprofile');
            setIsMyInfoOpen(!isMyInfoOpen);
          }}
        >
          view profile
        </p>
        <p
          className="text-lg font-semibold cursor-pointer hover:text-stroke-gray"
          onClick={() => {
            navigate('/myprofile/edit');
            setIsMyInfoOpen(!isMyInfoOpen);
          }}
        >
          edit profile
        </p>
        <p
          className="text-lg font-semibold cursor-pointer hover:text-stroke-gray"
          onClick={() => {
            navigate('/piggybank');
            setIsMyInfoOpen(!isMyInfoOpen);
          }}
        >
          Mileage
        </p>
        <p
          className="text-lg font-semibold text-red-500 cursor-pointer hover:text-red-700"
          onClick={() => {
            setIsLogoutOpen(true);
            setIsMyInfoOpen(!isMyInfoOpen);
          }}
        >
          sign out
        </p>
      </div>
    </div>
  );
}

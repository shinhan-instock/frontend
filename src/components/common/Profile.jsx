import { useState } from 'react';
import userImg from '/img/userImg.png';

function ProfileImage({ image, alt, fallbackText }) {
  return image ? (
    <img src={image} alt={alt} className="w-20 h-20" />
  ) : (
    <div className="w-20 h-20 bg-pink-400 text-white flex items-center justify-center text-2xl font-bold rounded-full shadow-lg">
      {fallbackText}
    </div>
  );
}

export default function Profile({ isMyProfile }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const userImage = userImg;

  return (
    <div className="flex flex-row items-start p-4 space-x-7">
      <ProfileImage image={userImage} alt="User Profile" fallbackText="SJ" />
      <div>
        <h2 className="text-2xl font-bold mb-2">sj</h2>
        <p className="text-gray-600">주식 폭주기니</p>
      </div>
      <button className="px-4 py-2 rounded-full font-medium text-sm transition-colors bg-gray-200 ">
        팔로잉
      </button>
      {!isMyProfile&&
      <button
        className={`px-4 py-2 rounded-full font-medium text-sm ${
          isFollowing ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'
        }`}
        onClick={() => setIsFollowing(!isFollowing)}
      >
        {isFollowing ? '팔로잉' : '팔로우'}
      </button>} 
      {/* 내프로필이 아닐때는 버튼 있음 */}
    </div>
  );
}

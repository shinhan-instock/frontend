import React, { useState, useEffect } from 'react';
import { useLogin } from '../../hooks/useLogin';
import ImageMaker from '../../utils/ImageMaker';
import { addComment } from '../../api/CommentAPI';

import { useNavigate } from 'react-router-dom';
import { checkInfluencerStatus } from '../../api/UserAPI';
import miniLogo from '/img/miniLogo.png';

export default function CommentCreate({ postId, comments, setComments }) {
  const [content, setContent] = useState('');
  const { userInfo } = useLogin();

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

  const handlePost = async () => {
    if (!content.trim()) return; // 빈 댓글 방지

    try {
      const newComment = await addComment(postId, userInfo.userId, content);

      setComments((prevComments) => [
        newComment, // 새로운 댓글을 최상단에 추가
        ...prevComments,
      ]);

      setContent(''); // 입력창 초기화
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
  };

  return (
    <div className="p-4 flex flex-row  w-full">
      <div className="flex py-3 flex-row items-start justify-center">
        {userInfo &&
          (userInfo.imageUrl ? (
            <div className="flex items-center justify-center w-[50px] h-[50px]">
              <img
                src={userInfo.imageUrl}
                alt="profile"
                className="rounded-full w-[50px] h-[50px]"
              />
            </div>
          ) : (
            <ImageMaker nickname={userInfo.nickname} />
          ))}
      </div>
      <div className="flex flex-col px-4  w-full">
        <div className="flex flex-row">
          <div className="flex justify-center items-center text-m">
            {userInfo.nickname}
            {isInfluencer && (
              <img
                src={miniLogo}
                className="w-5 h-5 ml-1"
                alt="Influencer Badge"
              />
            )}
          </div>
        </div>
        <textarea
          className="px-4 py-3 border rounded-2xl w-full text-stroke-gray h-[50px]"
          placeholder="댓글을 작성하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handlePost}
          className="mt-1 inline-flex self-end justify-center items-center bg-black text-white px-4 py-2 rounded-full font-medium text-sm"
        >
          POST
        </button>
      </div>
    </div>
  );
}

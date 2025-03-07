/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import { getLikeByUser, addLike, deleteLike } from "../../api/PostAPI";
import { useLogin } from "../../hooks/useLogin";
import ImageMaker from "../../utils/ImageMaker";

export default function Post({
  id,
  profileImg,
  content,
  nickname,
  created_at,
  hashtag,
  likes,
  comments,
  sentimentScore,
  images,
}) {
  const [likeId, setLikeId] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const addComment = (newComment) => {
    setCommentList([...commentList, newComment]);
  };

  const navigate = useNavigate();
  const { userInfo } = useLogin();

  useEffect(() => {
    if (userInfo?.userId) {
      getLikeByUser(userInfo.userId, id).then((result) => {
        if (result !== undefined) {
          setLikeId(result);
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      });
    }
  }, [id, userInfo?.userId, likeCount]);

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      deleteLike(likeId, userInfo.userId).then(() => {
        setIsLiked(false);
        setLikeId(null);
        setLikeCount((prev) => prev - 1);
      });
    } else {
      addLike(id, userInfo.userId).then(() => {
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      });
    }
  };

  const navigateToProfile = (e) => {
    e.stopPropagation();
    if (userInfo && nickname === userInfo.nickname) {
      navigate("/myprofile");
    } else {
      navigate(`/profile/${nickname}`);
    }
  };

  const [commentList, setCommentList] = useState([
    {
      nickname: "user1",
      created_at: "2025.03.5",
      content: "이 글 너무 좋네요!",
    },
    {
      nickname: "user2",
      created_at: "2025.03.5",
      content: "저도 비슷한 생각을 했어요.",
    },
    {
      nickname: "user3",
      created_at: "2025.03.5",
      content: "좋은 정보 감사합니다!",
    },
    {
      nickname: "user2",
      created_at: "2025.03.5",
      content: "저도 비슷한 생각을 했어요.",
    },
    {
      nickname: "user3",
      created_at: "2025.03.5",
      content: "좋은 정보 감사합니다!",
    },
  ]);

  return (
    <div>
      <div
        className="flex flex-col gap-2 px-20"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row gap-2">
            <div
              onClick={(e) => navigateToProfile(e)}
              className="cursor-pointer"
            >
              {profileImg !== null ? (
                <img
                  src={profileImg}
                  className="rounded-full w-[50px] h-[50px] "
                />
              ) : (
                <ImageMaker nickname={nickname} />
              )}
            </div>
            <div className="flex flex-col">
              <div>{nickname}</div>
              <div>
                {new Date(created_at).toLocaleString({
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </div>
            </div>
          </div>
          <div className="border-1 border-yellow-500 w-10 h-10 flex flex-row items-center justify-center rounded-lg">
            {sentimentScore}
          </div>
        </div>
        <div>{content}</div>
        {images && <img src={images} className="w-11/12 rounded-xl " />}

        <div
          className="bg-instock-gray w-fit text-zinc-600 px-4 text-sm hover:cursor-pointer"
          onClick={() => {
            navigate(`/stock/${hashtag}`);
          }}
        >
          {hashtag}
        </div>
        <div className="flex flex-row gap-3">
          <button onClick={handleLike}>{isLiked ? "❤️" : "🤍"}</button>
          <div>{likeCount}</div>

          <button>💬</button>
          <div>{comments}</div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <div className="flex flex-row gap-2">
            <div
              onClick={(e) => navigateToProfile(e)}
              className="cursor-pointer"
            >
              {profileImg !== null ? (
                <img
                  src={profileImg}
                  className="rounded-full w-[50px] h-[50px] "
                />
              ) : (
                <ImageMaker nickname={nickname} />
              )}
            </div>
            <div className="flex flex-col">
              <div className="font-bold">{nickname}</div>
              <div className="text-gray-500 text-sm">{created_at}</div>
            </div>
          </div>
          <div className="mt-3">{content}</div>
          <div
            className="bg-instock-gray w-fit text-zinc-600 px-4 text-sm mt-2 cursor-pointer"
            onClick={() => navigate(`/stock/${hashtag}`)}
          >
            {hashtag}
          </div>
          <div className="flex flex-row gap-3 mt-4">
            <button onClick={handleLike}>{isLiked ? "❤️" : "🤍"}</button>
            <div>{likeCount}</div>

            <button>💬</button>
            <div>{comments}</div>
          </div>
        </div>
        {userInfo && (
          <div>
            <CommentCreate addComment={addComment} />
          </div>
        )}

        <div
          className={`${userInfo ? "max-h-1/3" : "max-h-1/2"} overflow-auto`}
        >
          {commentList.map((comment, index) => (
            <CommentList key={index} comment={comment} />
          ))}
        </div>
      </Modal>
    </div>
  );
}

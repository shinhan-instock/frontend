/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import CommentCreate from "../comment/CommentCreate";
import CommentList from "../comment/CommentList";
import { addLike, deleteLike, addScrap, deleteScrap } from "../../api/PostAPI";
import { useLogin } from "../../hooks/useLogin";
import ImageMaker from "../../utils/ImageMaker";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";

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
  scrapped,
  liked,
}) {
  const [isLiked, setIsLiked] = useState(liked);
  const [scrap, setScrap] = useState(scrapped);
  // const [scrapId, setScrapId] = useState(null);
  // const [likeId, setLikeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [commentsData, setCommentsData] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useLogin();

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      deleteLike(id, userInfo.userId).then(() => {
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      });
    } else {
      addLike(id, userInfo.userId).then(() => {
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      });
    }
  };

  const handleScrap = (e) => {
    e.stopPropagation();
    if (scrap) {
      deleteScrap(id, userInfo.userId).then(() => {
        setScrap(false);
      });
    } else {
      addScrap(id, userInfo.userId).then(() => {
        setScrap(true);
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
  const sentimentColor =
    sentimentScore > 50 ? "border-green-500" : "border-red-500";
  return (
    <div>
      <div
        className="flex flex-col gap-2 border-b-2 border-instock-gray pb-4"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row gap-2">
            <div
              onClick={(e) => navigateToProfile(e)}
              className="cursor-pointer"
            >
              {profileImg ? (
                <img
                  src={profileImg}
                  className="rounded-full w-[50px] h-[50px]"
                />
              ) : (
                <ImageMaker nickname={nickname} />
              )}
            </div>
            <div className="flex flex-col">
              <div>{nickname}</div>
              <div>{new Date(created_at).toLocaleString()}</div>
            </div>
          </div>
          {hashtag && (
            <div
              className={`border-1 ${sentimentColor} w-10 h-10 flex flex-row items-center justify-center rounded-lg`}
            >
              {sentimentScore}
            </div>
          )}
        </div>
        <div>{content}</div>
        {images && <img src={images} className="w-11/12 rounded-xl" />}

        <div
          className="bg-instock-gray w-fit text-zinc-600 px-4 text-sm hover:cursor-pointer"
          onClick={() => {
            navigate(`/stock/${hashtag}`);
          }}
        >
          {hashtag}
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-3">
            <button onClick={handleLike}>{isLiked ? "❤️" : "🤍"}</button>
            <div>{likeCount}</div>

            <button>💬</button>
            <div>{comments}</div>
          </div>
          <button onClick={(e) => handleScrap(e)}>
            {scrap ? <BsBookmarkFill /> : <BsBookmark />}
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <div className="flex flex-row gap-2">
            <div
              onClick={(e) => navigateToProfile(e)}
              className="cursor-pointer"
            >
              {profileImg ? (
                <img
                  src={profileImg}
                  className="rounded-full w-[50px] h-[50px]"
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
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3 mt-4">
              <button onClick={handleLike}>{isLiked ? "❤️" : "🤍"}</button>
              <div>{likeCount}</div>
              <button>💬</button>
              <div>{comments}</div>
            </div>
            <button onClick={(e) => handleScrap(e)}>
              {scrap ? <BsBookmarkFill /> : <BsBookmark />}
            </button>
          </div>
        </div>
        {userInfo && (
          <div>
            <CommentCreate
              postId={id}
              comments={commentsData}
              setComments={setCommentsData}
            />
          </div>
        )}
        <div
          className={`${userInfo ? "max-h-1/3" : "max-h-1/2"} overflow-auto`}
        >
          <CommentList
            postId={id}
            comments={commentsData}
            setComments={setCommentsData}
          />
        </div>
      </Modal>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import CommentCreate from '../comment/CommentCreate';
import CommentList from '../comment/CommentList';
import {
  getLikeByUser,
  addLike,
  deleteLike,
  addScrap,
  deleteScrap,
} from '../../api/PostAPI';
import { useLogin } from '../../hooks/useLogin';
import ImageMaker from '../../utils/ImageMaker';
import { BsBookmark } from 'react-icons/bs';
import { BsBookmarkFill } from 'react-icons/bs';

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
  const [scrapId, setScrapId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [commentsData, setCommentsData] = useState([]);
  const [scrap, setScrap] = useState(false);
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

  useEffect(() => {
    const scrapList = JSON.parse(localStorage.getItem('scrap')) || [];
    console.log('스크랩 리스트:', scrapList); // 디버깅용 로그 추가

    const existingScrap = scrapList.find(
      (scrapItem) => scrapItem.postId === id
    );

    if (existingScrap) {
      setScrap(true);
      setScrapId(existingScrap.scrapId);
    } else {
      setScrap(false);
      setScrapId(null);
    }
  }, [id]); // `id`가 변경될 때마다 실행

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

  const handleScrap = (e) => {
    e.stopPropagation();

    let scrapList = JSON.parse(localStorage.getItem('scrap')) || []; // 기존 스크랩 목록 가져오기

    if (scrap) {
      deleteScrap(scrapId, userInfo.userId).then(() => {
        setScrap(false);
        scrapList = scrapList.filter((id) => {
          console.log('delete', id);
          id.postId !== id;
        });
        localStorage.setItem('scrap', JSON.stringify(scrapList));
      });
    } else {
      addScrap(id, userInfo.userId).then((data) => {
        setScrap(true);
        setScrapId(data);
        scrapList.push({ postId: id, scrapId: data }); // 스크랩한 게시글 id 넣기
        localStorage.setItem('scrap', JSON.stringify(scrapList));
      });
    }
  };

  const navigateToProfile = (e) => {
    e.stopPropagation();
    if (userInfo && nickname === userInfo.nickname) {
      navigate('/myprofile');
    } else {
      navigate(`/profile/${nickname}`);
    }
  };

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
              {profileImg !== null ? (
                <img
                  src={profileImg}
                  className="rounded-full object-contain w-[50px] h-[50px] "
                />
              ) : (
                <ImageMaker nickname={nickname} />
              )}
            </div>
            <div className="flex flex-col">
              <div>{nickname}</div>
              <div>
                {new Date(created_at).toLocaleString({
                  dateStyle: 'medium',
                  timeStyle: 'short',
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
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-3">
            <button onClick={handleLike}>{isLiked ? '❤️' : '🤍'}</button>
            <div>{likeCount}</div>

            <button>💬</button>
            <div>{comments}</div>
          </div>
          <button onClick={(e) => handleScrap(e)}>
            {scrap && userInfo ? <BsBookmarkFill /> : <BsBookmark />}
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
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3 mt-4">
              <button onClick={handleLike}>{isLiked ? '❤️' : '🤍'}</button>
              <div>{likeCount}</div>
              <button>💬</button>
              <div>{comments}</div>
            </div>
            <button onClick={(e) => handleScrap(e)}>
              {scrap && userInfo ? <BsBookmarkFill /> : <BsBookmark />}
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
          className={`${userInfo ? 'max-h-1/3' : 'max-h-1/2'} overflow-auto`}
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

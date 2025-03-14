import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { CuteConfirm } from './CuteConfirm';
import CommentCreate from '../comment/CommentCreate';
import CommentList from '../comment/CommentList';
import { IoCloseCircle } from 'react-icons/io5';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { LuTrash2 } from 'react-icons/lu';

import { checkInfluencerStatus } from '../../api/UserAPI';
import miniLogo from '/img/miniLogo.png';

import {
  addLike,
  deleteLike,
  addScrap,
  deleteScrap,
  updatePost,
  deletePost,
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
  scrapped,
  liked,
  deleted,
}) {
  const [isLiked, setIsLiked] = useState(liked);
  const [scrap, setScrap] = useState(scrapped);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [commentsData, setCommentsData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [imagePreviews, setImagePreviews] = useState(
    images ? [{ id: images, file: null }] : []
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [timeForce, setTimeForce] = useState();

  const navigate = useNavigate();
  const { userInfo } = useLogin();

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

  useEffect(() => {
    setTimeout(() => {}, 3000);
  }, [sentimentScore]);

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

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // 📌 1개 이상이면 경고 메시지 띄우기
    if (files.length > 1) {
      alert('이미지는 1개만 업로드할 수 있습니다.');
      return;
    }

    const newPreview = {
      id: URL.createObjectURL(files[0]),
      file: files[0],
    };

    setSelectedFile(files[0]); // 업로드할 파일 저장
    setImagePreviews([newPreview]); // 기존 이미지 제거 후 새 이미지 설정
  };

  const removeImage = () => {
    setImagePreviews([]);
    setSelectedFile(null);
  };

  const handleUpdatePost = async () => {
    try {
      await updatePost(id, userInfo.userId, editedContent, selectedFile);
      setIsEditMode(false);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {}
  };

  const handleDeletePost = async () => {
    CuteConfirm('이 게시글을 삭제하면 복구할 수 없어요!', async () => {
      try {
        const response = await deletePost(id, userInfo.userId);
        if (response.isSuccess) {
          setIsModalOpen(false);
          window.location.reload();
        }
      } catch (error) {}
    });
  };

  const navigateToProfile = (e) => {
    e.stopPropagation();
    if (userInfo && nickname === userInfo.nickname) {
      navigate('/myprofile');
    } else {
      navigate(`/profile/${nickname}`);
    }
  };
  const sentimentColor =
    sentimentScore > 50 ? 'border-green-500' : 'border-red-500';
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
              <div className="flex flex-row items-center">
                {nickname}
                <div>
                  {isInfluencer && (
                    <img
                      src={miniLogo}
                      className="w-5 h-5 ml-1"
                      alt="Influencer Badge"
                    />
                  )}
                </div>
              </div>
              <div>
                {new Date(created_at).toLocaleString({
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </div>
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
            <button onClick={handleLike}>{isLiked ? '❤️' : '🤍'}</button>
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
              <div
                className="flex flex-row
              items-center"
              >
                {nickname}
                <div>
                  {isInfluencer && (
                    <img
                      src={miniLogo}
                      className="w-5 h-5 ml-1"
                      alt="Influencer Badge"
                    />
                  )}
                </div>
              </div>
              <div className="text-gray-500 text-sm">
                {new Date(created_at).toLocaleString({
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </div>
            </div>
          </div>

          {isEditMode ? (
            <div className="flex flex-col gap-2 mt-3">
              <textarea
                className="w-full h-30 border p-2 rounded-md"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              {imagePreviews.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {imagePreviews.map(({ id }) => (
                    <div key={id} className="relative">
                      <img
                        src={id}
                        alt="Preview"
                        className="w-24 h-24 rounded-md"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-1 right-1 bg-gray-800 text-white p-1 rounded-full"
                      >
                        <IoCloseCircle size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-row gap-2 justify-between">
                <label className="cursor-pointer">
                  <MdOutlineAddPhotoAlternate className="w-8 h-8 text-blue-500" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <div className="flex flex-row gap-2">
                  <button
                    className="border-1 px-4 py-2 rounded-md"
                    onClick={handleUpdatePost}
                  >
                    저장
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setIsEditMode(false)}
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="justify-center mt-6">{content}</div>
              <div
                className="bg-instock-gray w-fit text-zinc-600 px-4 text-sm mt-2 cursor-pointer"
                onClick={() => navigate(`/stock/${hashtag}`)}
              >
                {hashtag}
              </div>{' '}
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-3 mt-4">
                  <button onClick={handleLike}>{isLiked ? '❤️' : '🤍'}</button>
                  <div>{likeCount}</div>
                  <button>💬</button>
                  <div>{comments}</div>
                </div>
                <div className="flex flex-row items-center gap-3">
                  {userInfo?.nickname === nickname && (
                    <div className="flex flex-row items-center gap-2">
                      <button onClick={handleEdit}>
                        <FiEdit />
                      </button>
                      <button onClick={handleDeletePost}>
                        <LuTrash2 />
                      </button>
                    </div>
                  )}
                  <button onClick={(e) => handleScrap(e)}>
                    {scrap ? <BsBookmarkFill /> : <BsBookmark />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        {!isEditMode && userInfo && (
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
          {!isEditMode && (
            <CommentList
              postId={id}
              comments={commentsData}
              setComments={setCommentsData}
            />
          )}
        </div>
      </Modal>
    </div>
  );
}

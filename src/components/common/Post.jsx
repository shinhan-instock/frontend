import { useState } from 'react';
import Modal from './Modal';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
export default function Post({
  img,
  content,
  nickname,
  created_at,
  hashtag,
  likes,
  comments,
  sentimentScore,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentList, setCommentList] = useState([
    {
      nickname: 'user1',
      created_at: '2025.03.5',
      content: '이 글 너무 좋네요!',
    },
    {
      nickname: 'user2',
      created_at: '2025.03.5',
      content: '저도 비슷한 생각을 했어요.',
    },
    {
      nickname: 'user3',
      created_at: '2025.03.5',
      content: '좋은 정보 감사합니다!',
    },
    {
      nickname: 'user3',
      created_at: '2025.03.5',
      content: '좋은 정보 감사합니다!',
    },
    {
      nickname: 'user3',
      created_at: '2025.03.5',
      content: '좋은 정보 감사합니다!',
    },
  ]);

  const addComment = (newComment) => {
    setCommentList([...commentList, newComment]);
  };

  return (
    <div className=" flex flex-col gap-2 px-20">
      <div className="flex flex-row gap-2">
        <img src={img} className="rounded-full w-[60px] h-[60px] " />
        <div className="flex flex-col">
          <div>{nickname}</div>
          <div>{created_at}</div>
        </div>
      </div>
      <div>{content}</div>
      <div className="bg-instock-gray w-fit text-zinc-600 px-4 text-sm">
        {hashtag}
      </div>
      <div className="flex flex-row gap-3">
        <button onClick={() => setIsLiked(!isLiked)}>
          {isLiked ? '❤️' : '🤍'}
        </button>
        <div>{likes}</div>

        <button onClick={() => setIsModalOpen(true)}>💬</button>
        <div>{comments}</div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <div className="flex flex-row gap-2">
            <img src={img} className="rounded-full w-[60px] h-[60px]" />
            <div className="flex flex-col">
              <div className="font-bold">{nickname}</div>
              <div className="text-gray-500 text-sm">{created_at}</div>
            </div>
          </div>
          <div className="mt-3">{content}</div>
          <div className="bg-instock-gray w-fit text-zinc-600 px-4 text-sm mt-2">
            {hashtag}
          </div>
          <div className="flex flex-row gap-3 mt-4">
            <button onClick={() => setIsLiked(!isLiked)}>
              {isLiked ? '❤️' : '🤍'}
            </button>
            <div>{likes}</div>

            <button>💬</button>
            <div>{comments}</div>
          </div>
        </div>
        <div>
          <CommentCreate addComment={addComment} />
        </div>
        <div className="max-h-[250px] overflow-auto">
          {commentList.map((comment, index) => (
            <CommentList key={index} comment={comment} />
          ))}
        </div>
      </Modal>
    </div>
  );
}

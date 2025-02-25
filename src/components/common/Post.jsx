import { useState } from 'react';


export default function Post({
  img,
  content,
  nickname,
  created_at,
  stock,
  likes,
  comments,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className=" flex flex-col gap-2 ">
      <div className="flex flex-row gap-2">
        <img src={img} className="rounded-full w-[60px] h-[60px] " />
        <div className="flex flex-col">
          <div>{nickname}</div>
          <div>{created_at}</div>
        </div>
      </div>
      <div>{content}</div>
      <div className="bg-instock-gray w-fit text-zinc-600 px-4 text-sm">
        {stock}
      </div>
      <div className="flex flex-row gap-3">
        <button onClick={() => setIsLiked(!isLiked)}>
          {isLiked ? '❤️' : '🤍'}
        </button>
        <div>{likes}</div>

        <button onClick={() => setIsModalOpen(true)}>💬</button>
        <div>{comments}</div>
      </div>

    </div>
  );
}

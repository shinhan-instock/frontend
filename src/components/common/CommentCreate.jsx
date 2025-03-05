import React, { useState } from "react";
import userImg from "/img/userImg.png";

export default function CommentCreate({ addComment }) {
  const [commentText, setCommentText] = useState("");

  const handlePost = () => {
    if (commentText.trim() !== "") {
      addComment({
        nickname: "akrxso",
        created_at: "2025.03.5",
        content: commentText,
      });
      setCommentText("");
    }
  };

  return (
    <div className="p-4 flex flex-row  w-full">
      <div className="flex py-3 flex-row items-start justify-center">
        <img src={userImg} alt="profile" className="w-16 h-16 rounded-full " />
      </div>
      <div className="flex flex-col mx-4  w-full">
        <div className="flex flex-row">
          <div className="flex justify-center items-center text-m font-bold">
            akrxso
          </div>
          <div className="flex justify-center items-center text-[8px] text-stroke-gray mx-3  ">
            2025.03.5
          </div>
        </div>
        <textarea
          className="p-4 border rounded-2xl w-full text-stroke-gray h-[50px]"
          placeholder="댓글을 작성하세요."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
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

/* eslint-disable react/prop-types */
import userImg from "/img/userImg.png";

export default function CommentList({ comment }) {
  return (
    <div className="p-4 flex flex-row w-full">
      <div className="flex items-center justify-center w-13 h-13 rounded-full">
        <img src={userImg} alt="profile" className="w-13 h-13 rounded-full" />
      </div>
      <div className="flex flex-col mx-4 w-full">
        <div className="flex flex-row">
          <div className="flex justify-center items-center text-m font-bold">
            {comment.nickname}
          </div>
          <div className="flex justify-center items-center text-[8px] text-stroke-gray mx-3">
            {comment.created_at}
          </div>
        </div>
        <div>{comment.content}</div>
      </div>
    </div>
  );
}

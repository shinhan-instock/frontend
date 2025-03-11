/* eslint-disable react/prop-types */
import ImageMaker from "../../utils/ImageMaker";
import userImg from "/img/userImg.png";

export default function Comment({ comment }) {
  return (
    <div className="px-8 py-3 flex flex-row w-full gap-3">
      <div className="flex items-center justify-center rounded-full">
        {comment.userImage ? (
          <img src={comment.userImage} />
        ) : (
          <ImageMaker nickname={comment.userId} />
        )}
      </div>
      <div className="flex flex-col mx-4 w-full">
        <div className="flex flex-row">
          <div className="flex justify-center items-center text-m font-bold">
            {comment.userId}
          </div>
          <div className="flex justify-center items-center text-[8px] text-stroke-gray mx-3">
            {new Date(comment.createdAt).toLocaleString({
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </div>
        </div>
        <div className="flex-grow overflow-hidden">{comment.content}</div>
      </div>
    </div>
  );
}

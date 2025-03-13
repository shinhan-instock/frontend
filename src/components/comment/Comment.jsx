/* eslint-disable react/prop-types */
import ImageMaker from "../../utils/ImageMaker";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export default function Comment({ comment }) {
  const navigate = useNavigate();
  const { userInfo } = useLogin();
  const url =
    userInfo.nickname == comment.userNickname
      ? "/myprofile"
      : `/profile/${comment.userNickname}`;

  return (
    <div className="p-4 py-3 flex flex-row w-full gap-3">
      <div className="flex items-center justify-center rounded-full">
        <div
          className="flex items-center justify-center w-[50px] h-[50px] "
          onClick={() => navigate(url)}
        >
          {comment.userImage ? (
            <img
              src={comment.userImage}
              className="rounded-full w-[50px] h-[50px]"
            />
          ) : (
            <ImageMaker nickname={comment.userNickname} />
          )}
        </div>
      </div>
      <div className="flex flex-col mx-4 w-full">
        <div className="flex flex-row">
          <div className="flex justify-center items-center text-m font-bold">
            {comment.userNickname}
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

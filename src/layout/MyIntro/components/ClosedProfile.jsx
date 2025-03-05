/* eslint-disable react/prop-types */
import { HiChevronDown } from "react-icons/hi";
import userImg from "/img/userImg.png";
import { useNavigate } from "react-router-dom";

export default function ClosedProfile({
  userInfo,
  setIsMyInfoOpen,
  isMyInfoOpen,
}) {
  console.log("closed", userInfo, isMyInfoOpen);
  const navigate = useNavigate();
  return (
    <div className="flex justify-between p-4 border border-stroke-gray rounded-lg z-10 relative">
      <div className="flex flex-row space-x-3">
        {userInfo && (
          <img src={userImg} alt="profile" className="w-14 h-14 rounded-full" />
        )}
        <div>
          {userInfo ? (
            <h2 className="text-lg font-semibold">{userInfo.id}</h2>
          ) : (
            <button className="pt-5 px-5 " onClick={() => navigate("/login")}>
              로그인 하러가기
            </button>
          )}

          {userInfo && <p className="text-gray-600 text-sm">주린이 탈출기</p>}
        </div>
      </div>
      {userInfo && (
        <button
          className="w-10 h-10 flex items-center rounded-full hover:bg-instock-gray justify-center"
          onClick={() => setIsMyInfoOpen(!isMyInfoOpen)}
        >
          <HiChevronDown className="w-7 h-7 text-gray-600" />
        </button>
      )}
    </div>
  );
}

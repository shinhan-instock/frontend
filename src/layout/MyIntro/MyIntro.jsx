import { useState } from "react";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";
import userImg from "/img/userImg.png";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

export default function MyIntro() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useLogin();
  console.log(userInfo);

  return (
    <div className="w-full mx-auto px-5">
      {isOpen && userInfo ? (
        <div className="flex flex-col p-4 border border-stroke-gray rounded-lg relative z-100">
          <div className="flex flex-row justify-between">
            <div className="flex">
              <img
                src={userImg}
                alt="profile"
                className="w-14 h-14 rounded-full"
              />
              <div className="flex-col px-3">
                <h2 className="text-lg font-bold">
                  {userInfo ? userInfo.id : "로그인이 필요해요"}
                </h2>
                <p className="text-gray-600 text-sm">주린이 탈출기</p>
              </div>
            </div>

            <button
              className="w-10 h-10 flex items-center rounded-full hover:bg-instock-gray justify-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <HiChevronUp className="w-7 h-7 text-gray-600" />
            </button>
          </div>
          <div className="flex flex-col p-4 mt-3 space-y-5">
            <p
              className="text-lg font-semibold cursor-pointer hover:text-stroke-gray"
              onClick={() => {
                navigate("/myprofile");
                setIsOpen(!isOpen);
              }}
            >
              view profile
            </p>
            <p
              className="text-lg font-semibold cursor-pointer hover:text-stroke-gray"
              onClick={() => {
                navigate("/myprofile/edit");
                setIsOpen(!isOpen);
              }}
            >
              edit profile
            </p>
            <p
              className="text-lg font-semibold text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              sign out
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-between p-4 border border-stroke-gray rounded-lg">
          <div className="flex flex-row space-x-3">
            <img
              src={userImg}
              alt="profile"
              className="w-14 h-14 rounded-full"
            />
            <div>
              {userInfo ? (
                <h2 className="text-lg font-semibold">{userInfo.id}</h2>
              ) : (
                <button
                  className="pt-5 px-5 "
                  onClick={() => navigate("/login")}
                >
                  로그인 하러가기
                </button>
              )}

              {userInfo && (
                <p className="text-gray-600 text-sm">주린이 탈출기</p>
              )}
            </div>
          </div>
          {userInfo && (
            <button
              className="w-10 h-10 flex items-center rounded-full hover:bg-instock-gray justify-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <HiChevronDown className="w-7 h-7 text-gray-600" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

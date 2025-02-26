import { useState } from 'react';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';
import userImg from '/img/userImg.png';

export default function MyIntro() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mx-auto px-5">
      {isOpen ? (
        <div className="flex flex-col p-4 border border-stroke-gray rounded-lg">
          <div className="flex flex-row justify-between">
            <div className="flex">
              <img
                src={userImg}
                alt="profile"
                className="w-14 h-14 rounded-full"
              />
              <div className="flex-col px-3">
                <h2 className="text-lg font-bold">akrxso</h2>
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
            <p className="text-lg font-semibold cursor-pointer hover:text-gray-700">
              view profile
            </p>
            <p className="text-lg font-semibold cursor-pointer hover:text-gray-700">
              edit profile
            </p>
            <p className="text-lg font-semibold text-red-500 cursor-pointer hover:text-red-700">
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
              <h2 className="text-lg font-bold">akrxso</h2>
              <p className="text-gray-600 text-sm">주린이 탈출기</p>
            </div>
          </div>
          <button
            className="w-10 h-10 flex items-center rounded-full hover:bg-instock-gray justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <HiChevronDown className="w-7 h-7 text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
}

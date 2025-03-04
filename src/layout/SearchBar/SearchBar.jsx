/* eslint-disable react/prop-types */
import { CiSearch } from "react-icons/ci";

export default function SearchBar({ setIsSearchOpen }) {
  const handleButtonClick = () => {
    setIsSearchOpen(true);
  };

  return (
    <>
      <div className="flex flex-col items-center p-4">
        <div className="w-4/5 border-1 border-stroke-gray py-1 px-5 rounded-md flex flex-row items-center gap-3">
          <CiSearch />
          <button
            onClick={handleButtonClick}
            className="w-full focus:outline-none text-left text-stroke-gray"
          >
            주식을 검색하려면 검색어에 ₩를 붙여주세요
          </button>
        </div>
      </div>
    </>
  );
}

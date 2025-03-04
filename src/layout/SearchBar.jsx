import { useState } from "react";
import searchIcon from "/img/searchIcon.png";
import stockImg from "/img/stockImg.png";
import WonFormatter from "../utils/WonFormatter";
import Modal from "../components/common/Modal";

export default function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center p-4">
        <div className="w-full border-1 border-stroke-gray py-1 px-5 rounded-md flex flex-row items-center gap-3">
          <img src={searchIcon} className="w-[20px] h-[20px]" />
          <input
            placeholder="주식을 검색하려면 검색어에 ₩를 붙여주세요"
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="w-full focus:outline-none"
          ></input>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          <h2 className="text-xl font-semibold">Search Results</h2>
        </div>
      </Modal>
    </>
  );
}

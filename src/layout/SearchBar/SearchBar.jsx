import { useState, useRef } from 'react';
import searchIcon from '/img/searchIcon.png';
import Modal from '../../components/common/Modal';
import {
  UserSearchResultList,
  StockSearchResultList,
} from './components/SearchResultList';
import TopStock from './components/TopStock';

export default function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  // 0: 검색 전, 1: 주식 검색, 2: 인물 검색
  const [searchType, setSearchType] = useState(0);

  const inputRef = useRef(null); // useRef로 input을 참조

  const handleSearch = (e) => {
    if (e.key == 'Enter') {
      if (searchInput.charAt(0) == '₩') {
        setSearchType(1);
      } else {
        setSearchType(2);
      }
    }
  };

  const handleFocus = () => {
    setSearchInput(''); // 포커스 시 입력값 초기화
  };

  const handleButtonClick = () => {
    setIsModalOpen(true);
    if (inputRef.current) {
      inputRef.current.focus(); // 버튼 클릭 시 input에 포커스 주기
    }
  };

  return (
    <>
      <div className="flex flex-col items-center p-4">
        <div className="w-4/5 border-1 border-stroke-gray py-1 px-5 rounded-md flex flex-row items-center gap-3">
          <img src={searchIcon} className="w-[20px] h-[20px]" />

          <button
            onClick={handleButtonClick}
            className="w-full focus:outline-none text-left text-stroke-gray"
          >
            주식을 검색하려면 검색어에 ₩를 붙여주세요
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center">
          <div className="w-11/12 border-1 border-stroke-gray bg-instock-gray py-1 px-5 rounded-md flex flex-row items-center gap-3">
            <img src={searchIcon} className="w-[20px] h-[20px]" />
            <input
              ref={inputRef} // useRef로 input 참조
              placeholder="주식을 검색하려면 검색어에 ₩를 붙여주세요"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              onKeyDown={(e) => {
                handleSearch(e);
              }}
              onFocus={handleFocus} // 입력 필드가 포커스되면 입력값 초기화
              className="w-full focus:outline-none"
              value={searchInput}
            ></input>
          </div>
          {searchType === 0 ? (
            <TopStock />
          ) : searchType === 1 ? (
            <StockSearchResultList />
          ) : (
            <UserSearchResultList />
          )}
        </div>
      </Modal>
    </>
  );
}

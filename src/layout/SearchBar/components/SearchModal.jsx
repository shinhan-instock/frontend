/* eslint-disable react/prop-types */
import Modal from "../../../components/common/Modal";
import { CiSearch } from "react-icons/ci";
import {
  UserSearchResultList,
  StockSearchResultList,
} from "./SearchResultList";
import TopStock from "./TopStock";
import { useEffect, useRef, useState } from "react";
import { getTopStocks } from "../../../api/stockAPI";

export default function SearchModal({ isSearchOpen, setIsSearchOpen }) {
  const [searchInput, setSearchInput] = useState("");
  // 0: 검색 전, 1: 주식 검색, 2: 인물 검색
  const [searchType, setSearchType] = useState(0);

  const inputRef = useRef(null);

  const handleSearch = (e) => {
    if (e.key == "Enter") {
      if (searchInput.charAt(0) == "₩") {
        setSearchType(1);
      } else {
        setSearchType(2);
      }
    }
  };

  const handleFocus = () => {
    setSearchInput("");
  };
  const [stockData, setStockData] = useState([]);
  useEffect(() => {
    getTopStocks().then((stocks) => setStockData(stocks));
  }, []);
  return (
    <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
      <div className="flex flex-col items-center">
        <div className="w-11/12 border-1 border-stroke-gray bg-instock-gray py-1 px-5 rounded-md flex flex-row items-center gap-3">
          <CiSearch />
          <input
            ref={inputRef}
            placeholder="주식을 검색하려면 검색어에 ₩를 붙여주세요"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            onKeyDown={(e) => {
              handleSearch(e);
            }}
            onFocus={handleFocus}
            className="w-full focus:outline-none"
            value={searchInput}
          ></input>
        </div>
        {searchType === 0 ? (
          <TopStock />
        ) : searchType === 1 ? (
          <StockSearchResultList stockData={stockData} />
        ) : (
          <UserSearchResultList />
        )}
      </div>
    </Modal>
  );
}

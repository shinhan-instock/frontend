/* eslint-disable react/prop-types */
import Modal from "../../../components/common/Modal";
import { CiSearch } from "react-icons/ci";
import {
  UserSearchResultList,
  StockSearchResultList,
} from "./SearchResultList";
import TopStock from "./TopStock";
import { useEffect, useRef, useState } from "react";
import { getTopStocks } from "../../../api/StockAPI";
import { searchStock } from "../../../api/StockAPI";
import { searchUser } from "../../../api/UserAPI"; // 사용자 검색 API를 불러옴 (예시)

export default function SearchModal({ isSearchOpen, setIsSearchOpen }) {
  const [searchInput, setSearchInput] = useState("");
  const [stockData, setStockData] = useState([]);
  const [userData, setUserData] = useState([]);
  // 0: 검색 전, 1: 주식 검색, 2: 인물 검색
  const [searchType, setSearchType] = useState(0);

  const inputRef = useRef(null);

  const handleSearch = (e) => {
    if (e.key === "Backspace") {
      if (searchInput.charAt(0) === "₩") {
        setSearchType(1);
      } else {
        setSearchType(2);
      }
    } else {
      if (searchInput.charAt(0) === "₩") {
        setSearchType(1);
      } else if (searchInput.length === 0) {
        setSearchType(0);
      } else {
        setSearchType(2);
      }
    }

    if (e.key === "Enter") {
      if (searchInput.charAt(0) === "₩") {
        setSearchType(1);
      } else if (searchType === 2) {
        searchUser(searchInput).then((data) => {
          setUserData(data);
        });
        setSearchType(2);
      } else {
        setSearchType(0);
      }
    }
  };

  const handleFocus = () => {
    setSearchInput("");
  };

  useEffect(() => {
    getTopStocks().then((stocks) => setStockData(stocks));
  }, []);

  useEffect(() => {
    if (searchType === 1 && searchInput) {
      searchStock(searchInput.slice(1)).then((data) => {
        setStockData(data);
      });
    } else if (searchType !== 1) {
      setStockData([]);
    }
  }, [searchType, searchInput]);

  return (
    <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
      <div className="flex flex-col items-center h-full">
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
        <div className="w-full h-5/6 ">
          {searchType === 0 ? (
            <TopStock setIsSearchOpen={setIsSearchOpen} />
          ) : searchType === 1 ? (
            <StockSearchResultList
              stockData={stockData}
              setIsSearchOpen={setIsSearchOpen}
            />
          ) : (
            <UserSearchResultList
              userData={userData}
              setIsSearchOpen={setIsSearchOpen}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}

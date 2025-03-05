import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import Header from "./Header";
import MyIntro from "./MyIntro/MyIntro";
import WatchList from "./WatchList/WatchList";
import MyStock from "./MyStock/MyStock";
import TopStock from "./TopStock/TopStock";
import Slider from "./Slider/Slider";
import Modal from "../components/common/Modal";
import SearchModal from "./SearchBar/components/SearchModal";
import LogoutModal from "./MyIntro/components/LogoutModal";
import { useState } from "react";

export default function Layout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMyInfoOpen, setIsMyInfoOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  console.log("islogout", isLogoutOpen);
  return (
    <div className="flex flex-row w-screen h-dvh">
      {/* 왼쪽 사이드바  */}
      <div className="flex flex-col w-1/4  gap-10 overflow-hidden ml-10 px-8">
        <Header />
        <MyIntro
          setIsMyInfoOpen={setIsMyInfoOpen}
          isMyInfoOpen={isMyInfoOpen}
          setIsLogoutOpen={setIsLogoutOpen}
        />
        <Slider isMyInfoOpen={isMyInfoOpen} />
        <WatchList />
      </div>

      {/* 센터 부분 */}
      <div className="flex flex-col w-2/4 overflow-hidden">
        <div className="sticky top-0 z-0 bg-white">
          <SearchBar setIsSearchOpen={setIsSearchOpen} />
        </div>
        {isSearchOpen === true ? (
          <SearchModal
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
          />
        ) : isLogoutOpen === true ? (
          <LogoutModal
            isLogoutOpen={isLogoutOpen}
            setIsLogoutOpen={setIsLogoutOpen}
          />
        ) : (
          <div className="flex-grow z-0">
            <Outlet />
          </div>
        )}
      </div>

      {/* 오른쪽 사이드바  */}
      <div className="flex flex-col w-1/4 mt-[80px] gap-10 overflow-hidden mr-10 px-8">
        <Modal />
        <MyStock />
        <TopStock />
      </div>
    </div>
  );
}

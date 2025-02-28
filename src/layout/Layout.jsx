import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import Header from "./Header";
import MyIntro from "./MyIntro/MyIntro";
import WatchList from "./WatchList/WatchList";
import MyStock from "./MyStock/MyStock";
import TopStock from "./TopStock/TopStock";
import Slider from "./Slider/Slider";
import M from "../components/common/Modal";

export default function Layout() {
  return (
    <div className="flex flex-row w-screen h-dvh">
      {/* 왼쪽 사이드바  */}
      <div className="flex flex-col w-1/4  gap-10 overflow-hidden ml-10 px-8">
        <Header />
        <MyIntro />
        <Slider />
        <WatchList />
      </div>

      {/* 센터 부분 */}
      <div className="flex flex-col w-2/4 overflow-hidden">
        <div className="sticky top-0 z-10 bg-white">
          <SearchBar />
        </div>
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>

      {/* 왼쪽 사이드바  */}
      <div className="flex flex-col w-1/4  gap-10 overflow-hidden mr-10">
        <M />
        <MyStock />
        <TopStock />
      </div>
    </div>
  );
}

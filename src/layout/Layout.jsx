import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import Header from "./Header";
import MyIntro from "./MyIntro/MyIntro";
import WatchList from "./WatchList/WatchList";
import MyStock from "./MyStock/MyStock";
import TopStock from "./TopStock/TopStock";

export default function Layout() {
  return (
    <div className="flex flex-row w-screen h-dvh gap-4">
      {/* 왼쪽 사이드바  */}
      <div className="flex flex-col w-1/4 border-1 gap-10 overflow-hidden">
        <Header />
        <MyIntro />
        <WatchList />
      </div>

      {/* 센터 부분 */}
      <div className="flex flex-col w-1/2 overflow-hidden">
        <div className="sticky top-0 z-10 bg-white">
          <SearchBar />
        </div>
        <div className="flex-grow px-5">
          <Outlet />
        </div>
      </div>

      {/* 왼쪽 사이드바  */}
      <div className="flex flex-col w-1/4 border-1 gap-10 overflow-hidden">
        <MyStock />
        <TopStock />
      </div>
    </div>
  );
}

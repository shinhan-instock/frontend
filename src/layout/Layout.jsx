import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import Header from "./Header";
import MyIntro from "./MyIntro/MyIntro";
import WatchList from "./WatchList/WatchList";
import MyStock from "./MyStock/MyStock";
import TopStock from "./TopStock/TopStock";

export default function Layout() {
  return (
    <div className="flex flex-row w-screen h-screen gap-4">
      <div className="flex flex-col w-1/4 border-1 gap-10">
        <Header />
        <MyIntro />
        <WatchList />
      </div>
      <div className="flex flex-col w-1/2 border-1 gap-10">
        <SearchBar />
        <Outlet />
      </div>
      <div className="flex flex-col w-1/4 border-1 gap-10">
        <MyStock />
        <TopStock />
      </div>
    </div>
  );
}

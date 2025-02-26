import { useState } from "react";
import searchIcon from "/img/searchIcon.png";

export default function SearchBar() {
  return (
    <div className="flex flex-col items-center p-4 mt-4">
      <div className="w-3/4 border-1 border-stroke-gray py-1 px-5 rounded-md flex flex-row items-center gap-3">
        <img src={searchIcon} className="w-[20px] h-[20px]" />
        <input
          placeholder="Search stocks, people"
          className="w-full focus:outline-none"
        ></input>
      </div>
    </div>
  );
}

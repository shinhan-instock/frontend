import { useState } from "react";

const menu = [
  { id: 1, menu: "실시간" },
  { id: 2, menu: "팔로잉" },
  { id: 3, menu: "인기글" },
];

export default function NavigationBar() {
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <div className="mb-3 bg-white w-full border-b-1 border-zinc-300">
      <div className=" h-7 flex flex-row justify-around mb-2">
        {menu.map((tab) => (
          <button
            key={tab.id}
            className={`w-1/3 rounded-lg  px-3 py-1 transition flex items-center justify-center ${
              selectedTab === tab.id ? "bg-zinc-100" : "bg-white"
            }`}
            onClick={() => setSelectedTab(tab.id)}
          >
            {tab.menu}
          </button>
        ))}
      </div>
    </div>
  );
}

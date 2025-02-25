import { useState } from "react";

const menuOptions = {
  default: [
    {id:1, menu:"실시간"},
    {id:2, menu:"팔로잉"},
    {id:3, menu:"인기글"},
  ],
  myprofile:[
    {id:1, menu:"내가 쓴 게시글"},
    {id:2, menu:"스크랩 글"},
  ],
  profile:[
    {id:1, menu:"게시글"},
    {id:2, menu:"SJ의 계좌"},
  ]
}

export default function NavigationBar({menuType}) {
  const [selectedTab, setSelectedTab] = useState(1);
  const menu = menuOptions[menuType];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl bg-white border-b border-instock-gray">
        <div className="h-13 flex flex-row justify-around p-3">
          {menu.map((tab) => (
            <button
              key={tab.id}
              className={`rounded-2xl w-1/4  transition flex items-center justify-center ${
                selectedTab === tab.id ? "bg-instock-gray" : "bg-white"
              }`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.menu}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const menuOptions = {
  default: [
    { id: 1, menu: "실시간" },
    { id: 2, menu: "팔로잉" },
    { id: 3, menu: "인기글" },
  ],
  myprofile: [
    { id: 1, menu: "내가 쓴 게시글" },
    { id: 2, menu: "스크랩 글" },
  ],
  profile: [
    { id: 1, menu: "게시글" },
    { id: 2, menu: "SJ의 계좌" },
  ],
  stock: [
    { id: 1, menu: "관련 게시글" },
    { id: 2, menu: "감정 분석" },
    { id: 3, menu: "관련주" },
  ],
};

export default function NavigationBar({
  menuType,
  selectedTab,
  setSelectedTab,
}) {
  // const [selectedTab, setSelectedTab] = useState(1);
  const menu = menuOptions[menuType];

  return (
    <div className="w-full flex justify-center z-0">
      <div className="w-full max-w-2xl bg-white border-b border-instock-gray mx-24">
        <div className="h-13 flex flex-row justify-around p-3 gap-10">
          {menu.map((tab) => (
            <button
              key={tab.id}
              className={`rounded-2xl w-2/5 transition flex items-center justify-center px-3 ${
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

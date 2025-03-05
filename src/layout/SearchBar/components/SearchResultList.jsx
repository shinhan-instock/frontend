import { UserSearchResult, StockSearchResult } from "./SearchResult";
import userImg from "/img/userImg.png";
import miniLogo from "/img/miniLogo.png";
import bcImg from "/img/bc.png";
import kbImg from "/img/kb.png";

const userdata = [
  { id: 1, img: userImg, nickname: "sj", intro: "주식 폭주기니" },
  {
    id: 2,
    img: miniLogo,
    nickname: "sjasdfasd",
    intro: "주식 폭주기니asdfasdfasdf",
  },
];

export function UserSearchResultList() {
  return (
    <div className="py-5 px-10 w-full">
      {userdata.map((item) => (
        <UserSearchResult
          key={item.id}
          img={item.img}
          nickname={item.nickname}
          intro={item.intro}
        />
      ))}
    </div>
  );
}

export function StockSearchResultList({ stockData }) {
  console.log("s", stockData);
  return (
    <div className="py-5 px-10 w-full overflow-auto h-120">
      {stockData.map((item) => (
        <StockSearchResult
          key={item.id}
          // img={item.img}
          stockName={item.stockName}
          stockCode={item.stockCode}
          price={item.price}
          changeRate={item.priceChangeRate}
        />
      ))}
    </div>
  );
}

/* eslint-disable react/prop-types */
import { UserSearchResult, StockSearchResult } from "./SearchResult";
import userImg from "/img/userImg.png";
import miniLogo from "/img/miniLogo.png";

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
  return (
    <div className="px-10 w-full overflow-auto">
      {stockData.map((item) => (
        <StockSearchResult
          key={item.id}
          stockName={item.stockName}
          stockCode={item.stockCode}
          price={item.price}
          changeRate={item.priceChangeRate}
        />
      ))}
    </div>
  );
}

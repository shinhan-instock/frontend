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

const stockdata = [
  {
    id: 1,
    img: kbImg,
    stockName: "kb",
    stockCode: "055550",
    price: 48450,
    changeRate: 0.1,
  },
  {
    id: 2,
    img: bcImg,
    stockName: "bc",
    stockCode: "055550",
    price: 48450,
    changeRate: 0.1,
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

export function StockSearchResultList() {
  return (
    <div className="py-5 px-10 w-full">
      {stockdata.map((item) => (
        <StockSearchResult
          key={item.id}
          img={item.img}
          stockName={item.stockName}
          stockCode={item.stockCode}
          price={item.price}
          changeRate={item.changeRate}
        />
      ))}
    </div>
  );
}

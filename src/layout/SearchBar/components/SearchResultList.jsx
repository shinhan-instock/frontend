/* eslint-disable react/prop-types */
import { UserSearchResult, TopResult, StockSearchResult } from "./SearchResult";

export function UserSearchResultList({ userData, setIsSearchOpen }) {
  return (
    <div className="py-5 px-10 w-full">
      {userData.map((item) => (
        <UserSearchResult
          setIsSearchOpen={setIsSearchOpen}
          key={item.id}
          img={item.imageUrl}
          nickname={item.nickname}
          intro={item.introduction}
        />
      ))}
    </div>
  );
}

export function StockSearchResultList({ stockData, setIsSearchOpen }) {
  return (
    <div className="px-10 w-full overflow-auto h-full my-5">
      {stockData.map((item) => (
        <StockSearchResult
          key={item.id}
          stockName={item}
          setIsSearchOpen={setIsSearchOpen}
        />
      ))}
    </div>
  );
}

export function TopStockResult({ stockData, setIsSearchOpen }) {
  return (
    <div className="px-10 w-full overflow-auto">
      {stockData.map((item) => (
        <TopResult
          setIsSearchOpen={setIsSearchOpen}
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

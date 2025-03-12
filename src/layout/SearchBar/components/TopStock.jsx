import { TopStockResult } from "./SearchResultList";
import { getTopStocks } from "../../../api/StockAPI";
import { useEffect, useState } from "react";

export default function TopStock({ setIsSearchOpen }) {
  const [stockData, setStockData] = useState([]);
  useEffect(() => {
    getTopStocks().then((stocks) => setStockData(stocks));
  }, []);

  return (
    <div className="flex flex-col w-full h-full ">
      <div className="px-10 pt-5 pb-3 text-lg">
        실시간 등락율 높은 주식 Top 20
      </div>
      <TopStockResult stockData={stockData} setIsSearchOpen={setIsSearchOpen} />
    </div>
  );
}

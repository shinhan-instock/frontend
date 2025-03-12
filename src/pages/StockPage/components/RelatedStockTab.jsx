/* eslint-disable react/prop-types */
import RelatedStockList from "./RelatedStockList";
import { getRelatedStocks } from "../../../api/StockAPI";
import { useEffect, useState } from "react";

export default function RelatedStockTab({ stockName, stockDesc }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    getRelatedStocks(stockName).then((result) => {
      setData(result);
    });
  }, [stockName]);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-text-blue  text-xl">기업 개요</div>
      <div className="bg-background-blue p-5 rounded-xl">{stockDesc}</div>
      <div className="text-text-blue  text-xl">자동차 업종별 등락율 top5</div>
      <div className="bg-background-blue p-3 rounded-xl flex flex-row gap-4">
        <div className="bg-white w-1/2 p-5  rounded-xl">
          <RelatedStockList stockData={data.slice(5, 10).reverse()} />
        </div>
        <div className="bg-white w-1/2 p-5  rounded-xl">
          <RelatedStockList stockData={data.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
}

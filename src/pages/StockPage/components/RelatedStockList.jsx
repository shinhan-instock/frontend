import RelatedStock from "./RelatedStock";
import { getRelatedStocks } from "../../../api/StockAPI";
import { useEffect, useState } from "react";

const data = [
  { id: 1, name: "도이치 모터스", price: 15470, change_rate: 1.54 },
  { id: 2, name: "도이치 모터스", price: 15470, change_rate: 1.54 },
  { id: 3, name: "도이치 모터스", price: 15470, change_rate: 1.54 },
  { id: 4, name: "도이치 모터스", price: 15470, change_rate: 1.54 },
  { id: 5, name: "도이치 모터스", price: 15470, change_rate: 1.54 },
];

export default function RelatedStockList({ stockData }) {
  return (
    <div className="p-1">
      {stockData.map((stock) => (
        <RelatedStock
          key={stock.id}
          name={stock.stockName}
          price={stock.price}
          change_rate={stock.priceChange}
        />
      ))}
    </div>
  );
}

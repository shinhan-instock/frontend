/* eslint-disable react/prop-types */
import React from "react";
import WonFormatter from "../../../utils/WonFormatter";
import { useNavigate } from "react-router-dom";
import { addDefaultImg } from "../../../utils/DefaultImage";

export function InfluencerStockItem({ stock }) {
  const navigate = useNavigate();
  console.log(stock, "sto");
  return (
    <div
      className="px-10 border-b-1 border-instock-gray py-3 flex flex-row justify-between hover:bg-instock-gray"
      onClick={() => navigate(`/stock/${stock.stockName}`)}
    >
      <div className="flex flex-row  items-center gap-5  ">
        <img
          src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stock.stockCode}.png`}
          className=" w-10 h-10 rounded-full"
          onError={addDefaultImg}
        />
        <div className="flex flex-col">
          <div>{stock.stockName}</div>
          <div>{stock.stockCode}</div>
        </div>
      </div>
      <div className="flex flex-col text-end">
        <div className="font-semibold">
          {WonFormatter.format(stock.avgPrice)} ({stock.stockCount}주)
        </div>
        {stock.profit > 0 ? (
          <div className="text-red-500"> +{stock.profit.toFixed(2)} %</div>
        ) : (
          <div className="text-blue-500"> {stock.profit.toFixed(2)} %</div>
        )}
      </div>
    </div>
  );
}

export function StockItem({ stock }) {
  const navigate = useNavigate();
  console.log("stock", stock);
  return (
    <div
      className="flex flex-row  items-center gap-5 px-10 border-b-1 border-instock-gray py-3  hover:bg-gray-100 transition duration-200"
      onClick={() => navigate(`/stock/${stock.stockName}`)}
    >
      <img
        src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stock.stockCode}.png`}
        className=" w-10 h-10 rounded-full"
        onError={addDefaultImg}
      />
      <div className="flex flex-col">
        <div>{stock.stockName}</div>
        <div>{stock.stockCode}</div>
      </div>
    </div>
  );
}

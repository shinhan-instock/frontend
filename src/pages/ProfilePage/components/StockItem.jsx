/* eslint-disable react/prop-types */
import React from "react";

export function InfluencerStockItem({ stock }) {
  console.log("stockitem", stock);
  return (
    <div className="px-10 border-b-1 border-instock-gray pb-4 flex flex-row justify-between">
      <div className="flex flex-row  items-center gap-5  ">
        <img
          src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stock.stockCode}.png`}
          className=" w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <div>{stock.stockName}</div>
          <div>{stock.stockCode}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <div>총금액</div>
        <div>전체 등락율</div>
      </div>
    </div>
  );
}

// 계좌 공개한 일반 사람
export function StockItem({ stock }) {
  console.log("stockitem", stock);
  return (
    <div className="flex flex-row  items-center gap-5 px-10 border-b-1 border-instock-gray pb-4 ">
      <img src="" className="border-1 w-10 h-10 rounded-full" />
      <div className="flex flex-col">
        <div>{stock.stockName}</div>
        <div>코드</div>
      </div>
    </div>
  );
}

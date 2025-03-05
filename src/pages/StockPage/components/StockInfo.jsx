/* eslint-disable react/prop-types */
import stockImg from "/img/stockImg.png";
import WonFormatter from "../../../utils/WonFormatter";
import { getStockInfo } from "../../../api/stockAPI";
import { useEffect, useState } from "react";

export default function StockInfo({ stockName }) {
  console.log("name", stockName);
  const [stockData, setStockData] = useState({});
  useEffect(() => {
    getStockInfo(stockName).then((data) => {
      setStockData(data);
    });
  }, [stockName]);

  return (
    <div className="flex flex-col w-full mt-6">
      <div className="flex flex-row items-center justify-evenly w-full pb-2 flex-wrap">
        <div className="flex flex-row items-center gap-14 w-full justify-evenly">
          <img
            src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stockData.stockCode}.png`}
            className="w-20 h-20 rounded-full"
          />
          <div className="flex flex-col items-start gap-2 ">
            <div className="text-xl font-semibold">{stockData.stockName}</div>
            <div className="text-stroke-gray">{stockData.stockCode}</div>
          </div>
          <div className="flex flex-row items-center gap-10">
            <div className="flex flex-col">
              <div className="text-lg">
                {" "}
                {WonFormatter.format(stockData.price)}
              </div>
              {stockData.priceChange > 0 ? (
                <div className="font-bold text-xl text-red-500 ">
                  + {stockData.priceChange} %
                </div>
              ) : (
                <div className="font-bold text-xl text-blue-500">
                  {stockData.priceChange} %
                </div>
              )}
            </div>
            <div className="flex flex-row justify-end h-1/3">
              <button className="w-36 bg-black text-white  px-6 py-1 rounded-xl hover:bg-instock-gray hover:text-black">
                + watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable react/prop-types */
import WonFormatter from "../../../utils/WonFormatter";
import { getStockInfo } from "../../../api/StockAPI";
import { useEffect, useState } from "react";
import { addWatchList, deleteWatchList } from "../../../api/UserAPI";
import { useLogin } from "../../../hooks/useLogin";

export default function StockInfo({ stockName, onUpdate }) {
  const { userInfo } = useLogin();
  const [stockData, setStockData] = useState({});
  const [isInWatchList, setIsInWatchList] = useState(false);

  useEffect(() => {
    getStockInfo(stockName).then((data) => {
      setStockData(data);
    });
  }, []);

  useEffect(() => {
    const watchList = JSON.parse(localStorage.getItem("watchList")) || [];
    setIsInWatchList(watchList.includes(stockData.stockCode));
  }, [stockData]);

  const handleWatchList = async () => {
    let watchList = JSON.parse(localStorage.getItem("watchList")) || [];

    if (isInWatchList) {
      watchList = watchList.filter((code) => code !== stockData.stockCode);
      await deleteWatchList(userInfo.userId, stockName);
      location.reload();
    } else {
      watchList.push(stockData.stockCode);
      await addWatchList(userInfo.userId, stockData.stockCode, stockName);
      location.reload();
    }
    localStorage.setItem("watchList", JSON.stringify(watchList));

    setIsInWatchList(!isInWatchList);
    if (onUpdate) {
      onUpdate();
    }
  };

  return (
    <div className="flex flex-col w-full mt-6">
      <div className="flex flex-row items-center justify-evenly w-full pb-2 flex-wrap">
        <div className="flex flex-row items-center gap-14 w-full justify-evenly">
          <img
            src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stockData.stockCode}.png`}
            className="w-20 h-20 rounded-full"
          />
          <div className="flex flex-col items-start gap-2">
            <div className="text-xl font-semibold">{stockData.stockName}</div>
            <div className="text-stroke-gray">{stockData.stockCode}</div>
          </div>
          <div className="flex flex-row items-center gap-10">
            <div className="flex flex-col">
              <div className="text-lg">
                {WonFormatter.format(stockData.price)}
              </div>
              {stockData.priceChange > 0 ? (
                <div className="font-bold text-xl text-red-500">
                  + {stockData.priceChange} %
                </div>
              ) : (
                <div className="font-bold text-xl text-blue-500">
                  {stockData.priceChange} %
                </div>
              )}
            </div>
            <div className="flex flex-row justify-end h-1/3">
              <button
                className={`w-36 px-6 py-1 rounded-xl border border-black 
                  ${
                    isInWatchList
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }
                  hover:bg-gray-200`}
                onClick={handleWatchList}
              >
                {isInWatchList ? "- Watchlist" : "+ Watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { useLogin } from "../../../hooks/useLogin";
import { useWatchList } from "../../../context/WatchListContext";
import { getStockInfo } from "../../../api/StockAPI";
import WonFormatter from "../../../utils/WonFormatter";

export default function StockInfo({
  stockName,
  setStockDesc,
  setSentimentNum,
}) {
  const { userInfo } = useLogin();
  const [isInWatchList, setIsInWatchList] = useState(true);
  const { watchList, addStockToWatchList, removeStockFromWatchList } =
    useWatchList();

  const [stockData, setStockData] = useState({});
  const prevWatchListAdded = useRef(null);

  useEffect(() => {
    const closeSSE = getStockInfo(
      stockName,
      userInfo?.userId,
      (data) => {
        setStockData(data);
        setStockDesc(data.description);
        setSentimentNum(data.sentimentScore);
        if (prevWatchListAdded.current !== data.watchListAdded) {
          prevWatchListAdded.current = data.watchListAdded;
          setIsInWatchList(data.watchListAdded);
        }
      },
      (error) => {
        console.error("❌ SSE 오류 발생:", error);
      }
    );

    return () => {
      closeSSE();
    };
  }, [setStockDesc, stockName, userInfo?.userId]);

  useEffect(() => {
    const isInList = watchList.some((stock) => stock.stockName === stockName);
    if (isInWatchList !== isInList) {
      setIsInWatchList(isInList);
    }
  }, [watchList, stockName]);

  const handleWatchList = async () => {
    if (isInWatchList) {
      await removeStockFromWatchList(stockName);
      setIsInWatchList(false);
    } else {
      await addStockToWatchList(
        stockData.stockCode,
        stockName,
        stockData.price,
        stockData.priceChange
      );
      setIsInWatchList(true);
    }
  };

  return (
    <div className="flex flex-col w-full mt-6">
      <div className="flex flex-row items-center justify-evenly w-full pb-2 flex-wrap">
        <div className="flex flex-row items-center gap-14 w-full justify-evenly">
          <img
            src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stockData.stockCode}.png`}
            className="w-[50px] h-[50px] rounded-full"
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
              {userInfo ? (
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
              ) : (
                <div className="w-36 px-6 py-1"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

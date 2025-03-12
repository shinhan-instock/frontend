/* eslint-disable react/prop-types */
import WonFormatter from "../../../utils/WonFormatter";
import { getStockInfo } from "../../../api/StockAPI";
import { useEffect, useState } from "react";
import { addWatchList, deleteWatchList } from "../../../api/UserAPI";
import { useLogin } from "../../../hooks/useLogin";
import { useWatchList } from "../../../context/WatchListContext";

export default function StockInfo({ stockName }) {
  const { userInfo } = useLogin();
  const { watchList, addStockToWatchList, removeStockFromWatchList } =
    useWatchList(); // ✅ 전역 관심목록 사용
  const [stockData, setStockData] = useState({});
  const [isInWatchList, setIsInWatchList] = useState();

  useEffect(() => {
    async function fetchStockInfo() {
      const user = userInfo?.userId ? userInfo.userId : null;
      try {
        const data = await getStockInfo(stockName, user);
        setStockData(data);
        setIsInWatchList(data.watchListAdded);
      } catch (error) {
        console.error("❌ 주식 정보 불러오기 실패:", error);
      }
    }

    fetchStockInfo();
  }, [stockName, userInfo?.userId]);

  // 관심목록 포함 여부 확인
  useEffect(() => {
    setIsInWatchList(watchList.some((stock) => stock.stockName === stockName));
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
      setIsInWatchList(false);
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

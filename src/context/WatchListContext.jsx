import { createContext, useContext, useState, useEffect } from "react";
import { getWatchList, addWatchList, deleteWatchList } from "../api/UserAPI";
import { useLogin } from "../hooks/useLogin";

const WatchListContext = createContext();

export function WatchListProvider({ children }) {
  const { userInfo } = useLogin();
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    if (!userInfo?.userId) return;

    const closeSSE = getWatchList(
      userInfo.userId,
      (data) => {
        console.log("swa", data);
        setWatchList(
          data.result.map((stock) => ({
            stockCode: stock.stockCode,
            stockName: stock.stockName,
            currentPrice: stock.currentPrice,

            changeRate: stock.changeRate, // ✅ 등락율도 상태에 반영
          }))
        );
      },
      (error) => {
        console.error("SSE 오류 발생:", error);
      }
    );

    return () => {
      closeSSE();
    };
  }, [userInfo?.userId]);

  const addStockToWatchList = async (
    stockCode,
    stockName,
    currentPrice,
    changeRate // ✅ 등락율 추가
  ) => {
    try {
      await addWatchList(userInfo.userId, stockCode, stockName);

      setWatchList((prevList) => [
        ...prevList,
        { stockCode, stockName, currentPrice, changeRate },
      ]);
    } catch (error) {
      console.error("❌ 관심목록 추가 실패:", error);
    }
  };

  const removeStockFromWatchList = async (stockName) => {
    try {
      await deleteWatchList(userInfo.userId, stockName);
      setWatchList((prevList) =>
        prevList.filter((stock) => stock.stockName !== stockName)
      );
    } catch (error) {
      console.error("❌ 관심목록 삭제 실패:", error);
    }
  };

  return (
    <WatchListContext.Provider
      value={{ watchList, addStockToWatchList, removeStockFromWatchList }}
    >
      {children}
    </WatchListContext.Provider>
  );
}

export function useWatchList() {
  return useContext(WatchListContext);
}

import { createContext, useContext, useState, useEffect } from "react";
import { getWatchList, addWatchList, deleteWatchList } from "../api/UserAPI";
import { useLogin } from "../hooks/useLogin";

const WatchListContext = createContext();

export function WatchListProvider({ children }) {
  const { userInfo } = useLogin();
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    if (!userInfo?.userId) return;

    async function fetchWatchList() {
      try {
        const data = await getWatchList(userInfo.userId);
        setWatchList(data?.result || []);
      } catch (error) {
        console.error("❌ 관심목록 불러오기 실패:", error);
        setWatchList([]);
      }
    }

    fetchWatchList();
  }, [userInfo?.userId]);

  const addStockToWatchList = async (
    stockCode,
    stockName,
    currentPrice,
    priceChange
  ) => {
    try {
      await addWatchList(userInfo.userId, stockCode, stockName);
      setWatchList((prevList) => [
        ...prevList,
        { stockCode, stockName, currentPrice, priceChange },
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

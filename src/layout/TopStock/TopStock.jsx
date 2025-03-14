import { useState, useEffect } from "react";
import { getTop10Stocks } from "../../api/StockAPI.jsx";

import { useNavigate } from "react-router-dom";
import { addDefaultImg } from "../../utils/DefaultImage";

export default function TopStock() {
  const navigate = useNavigate();
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const eventSource = getTop10Stocks(
      (data) => {
        const prevRankings = sessionStorage.getItem("top_10_rank")
          ? JSON.parse(sessionStorage.getItem("top_10_rank"))
          : [];

        const updatedStockData = data.map((stock, data_idx) => {
          let top = "-";

          // 이전 순위와 비교하여 상승/하락 여부 결정
          const prevIndex = prevRankings.findIndex(
            (item) => item.id === stock.stockCode
          );
          if (prevIndex !== -1) {
            if (data_idx < prevIndex) {
              top = "▲";
            } else if (data_idx > prevIndex) {
              top = "▼";
            }
          }

          return {
            id: stock.stockCode,
            name: stock.stockName,
            img: `https://static.toss.im/png-icons/securities/icn-sec-fill-${stock.stockCode}.png`,
            top,
          };
        });

        setStockData(updatedStockData);
        sessionStorage.setItem("top_10_rank", JSON.stringify(updatedStockData));
      },
      (error) => {
        console.error("SSE 연결 오류:", error);
      }
    );

    return () => {
      eventSource();
    };
  }, []);

  return (
    <div className="w-full mx-auto px-5">
      <div className="flex flex-col p-4 rounded-lg bg-instock-gray">
        <div className="flex mb-4 justify-center font-title">실시간 검색어</div>

        <div
          className="flex flex-col h-64 overflow-auto
          "
        >
          {stockData.map((stock) => (
            <div
              key={stock.id}
              className="flex justify-between space-y-3 w-full cursor-pointer hover:bg-gray-200 p-2 rounded-md"
              onClick={() => navigate(`/stock/${stock.name}`)}
            >
              <div className="flex flex-row space-x-3 w-full">
                <img
                  src={stock.img}
                  onError={addDefaultImg}
                  alt={stock.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex justify-between w-full">
                  <div className="flex w-full items-center">
                    <p className="text-sm font-bold">{stock.name}</p>
                  </div>
                  <div className="flex justify-center items-center">
                    {stock.top}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { HiOutlineX } from "react-icons/hi";
import { FaWonSign } from "react-icons/fa6";
import { MdPercent } from "react-icons/md";
import { useState, useEffect } from "react";
import { useLogin } from "../../hooks/useLogin";
import { getWatchList } from "../../api/UserAPI";
import { useNavigate } from "react-router-dom";

export default function WatchList() {
  const { userInfo } = useLogin();
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.userId) return;

    const closeSSE = getWatchList(
      userInfo.userId,
      (data) => {
        setStocks(data.result);
      },
      (error) => {
        console.error("SSE 오류 발생:", error);
      }
    );

    return () => {
      closeSSE();
    };
  }, [userInfo?.userId]);

  const removeStocks = (id) => {
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

  return (
    <div className="w-full mx-auto px-5 h-3/7 ">
      <div className="flex flex-col p-4 rounded-lg bg-instock-gray h-11/12">
        <div className="flex mb-4">
          <button className="w-auto bg-black text-zinc-100 font-medium px-4 rounded-2xl">
            + watchList
          </button>
        </div>
        {userInfo ? (
          <div className="flex flex-col h-full overflow-auto">
            {stocks.length !== 0 &&
              stocks.map((stock) => (
                <div
                  key={stock.stockCode}
                  className="flex justify-between space-y-3 w-full my-3"
                  onClick={() => navigate(`stock/${stock.stockName}`)}
                >
                  <div className="flex flex-row space-x-3 w-full">
                    <img
                      src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stock.stockCode}.png`}
                      alt={stock.name}
                      className="w-13 h-13 rounded-full"
                    />
                    <div className="flex justify-between w-full">
                      <div className="w-full">
                        <div className="flex justify-between items-start w-full">
                          <p className="text-sm font-bold">{stock.stockName}</p>
                          <div className="flex items-start ">
                            <p className="flex items-center text-red-500">
                              {stock.changeRate}
                              <MdPercent />
                            </p>
                            <button
                              className="w-6 h-6 flex items-center rounded-full hover:bg-instock-gray justify-center"
                              // onClick={() => removeStocks(stock.id)}
                            >
                              <HiOutlineX className="w-4 h-4 text-gray-600 hover:text-red-500" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm flex items-center">
                          <p className="mr-1">현재가</p>
                          <FaWonSign className="w-3 h-3" />
                          <p className="ml-1">{stock.currentPrice}</p>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div>관심목록을 등록하려면 로그인이 필요해요</div>
        )}
      </div>
    </div>
  );
}

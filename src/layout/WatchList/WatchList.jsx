import { HiOutlineX } from "react-icons/hi";
import { useWatchList } from "../../context/WatchListContext";
import { useNavigate } from "react-router-dom";
import WonFormatter from "../../utils/WonFormatter";
import { useLogin } from "../../hooks/useLogin";

export default function WatchList() {
  const { userInfo } = useLogin();
  const { watchList, removeStockFromWatchList } = useWatchList();
  console.log("wwww", watchList);
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto px-5 h-3/7">
      <div className="flex flex-col p-4 rounded-lg bg-instock-gray h-11/12">
        <div className="flex mb-4">
          <button className="w-auto bg-black text-zinc-100 font-medium px-4 rounded-2xl">
            + watchList
          </button>
        </div>
        {userInfo ? (
          <div className="flex flex-col h-full overflow-auto">
            {watchList.length > 0 ? (
              watchList.map((stock) => (
                <div
                  key={stock.stockCode}
                  className="flex justify-between space-y-3 w-full my-3"
                  onClick={() => navigate(`stock/${stock.stockName}`)}
                >
                  <div className="flex flex-row space-x-3 w-full">
                    <img
                      src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stock.stockCode}.png`}
                      alt={stock.stockName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-row justify-between w-full">
                      <div className="w-full">
                        <div className="flex justify-between items-start w-full">
                          <p className="text-md">{stock.stockName}</p>

                          <div className="flex items-start">
                            <p className="text-md flex items-center">
                              <span className="ml-1">
                                {WonFormatter.format(stock.currentPrice)}
                              </span>
                            </p>

                            <button
                              className="w-6 h-6 flex items-center rounded-full hover:bg-instock-gray justify-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeStockFromWatchList(stock.stockName);
                              }}
                            >
                              <HiOutlineX className="w-4 h-4 text-gray-600 hover:text-red-500" />
                            </button>
                          </div>
                        </div>

                        <p className="mr-6">
                          {stock.changeRate > 0 ? (
                            <span className="flex flex-row w-full justify-end text-red-500">
                              + {stock.changeRate} %
                            </span>
                          ) : (
                            <span className="flex w-full justify-end text-blue-500">
                              {stock.changeRate} %
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                관심목록이 비어있습니다.
              </div>
            )}
          </div>
        ) : (
          <div>관심목록을 등록하려면 로그인이 필요해요</div>
        )}
      </div>
    </div>
  );
}

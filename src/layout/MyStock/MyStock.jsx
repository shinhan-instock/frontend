import { useEffect, useState } from 'react';
import { FaWonSign } from 'react-icons/fa6';
import { MdPercent } from 'react-icons/md';
import { useLogin } from '../../hooks/useLogin';
import { account } from '../../api/UserAPI';

export default function MyStock() {
  const { userInfo } = useLogin();
  const [isLinked, setIsLinked] = useState(false);
  const [stockData, setStockData] = useState([]);
  const [hasNoStock, setHasNoStock] = useState(false);

  useEffect(() => {
    if (!userInfo) return;
    async function fetchAccountData() {
      try {
        const data = await account(userInfo);

        setStockData(data);
        setIsLinked(true);
        setHasNoStock(false);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setIsLinked(false); // 계좌가 없으면 연동 필요
          } else if (error.response.status === 400) {
            setHasNoStock(true); // 보유 주식 없음
            setIsLinked(true); // 계좌는 연동된 상태
          }
        } else {
          console.log('⚠️ 다른 오류 발생');
        }
      }
    }

    fetchAccountData();
  }, [userInfo]);

  return (
    <div className="w-full mx-auto px-5">
      <div className="flex flex-col p-4 rounded-lg bg-instock-gray">
        <div className="flex mb-4 justify-center font-title">내 계좌</div>

        {/* 계좌 연동 안 된 경우 (isLinked === false) 404 오류 */}
        {!isLinked ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span
                className="text-2xl text-gray-500"
                onClick={() =>
                  window.open(
                    'https://www.shinhansec.com/siw/customer-center/open-accounts/712901/contents.do',
                    '_blank'
                  )
                }
              >
                +
              </span>
            </div>
            <p className="mt-10 text-lg font-semibold">내 증권 계좌 연동하기</p>
            <p className="text-sm text-gray-500 font-title">
              다양한 서비스를 사용하기 위해 필요해요
            </p>
          </div>
        ) : /* 계좌는 있지만 보유 주식이 없는 경우 400 오류 */
        hasNoStock || stockData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <img
              src="/img/crypig.png"
              alt="보유 주식 없음"
              className="w-[100px] h-[100px]"
            />
            <p className="mt-10 text-lg font-semibold">보유 주식이 없어요</p>
          </div>
        ) : (
          /* 보유 주식이 있는 경우 */
          <div className="flex flex-col h-64 overflow-auto">
            {stockData.map((stock, index) => (
              <div
                key={index}
                className="flex justify-between space-y-3 w-full cursor-pointer hover:bg-gray-200 p-2 rounded-md"
              >
                <div className="flex flex-row space-x-3 w-full">
                  <img
                    src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stock.stockCode}.png`}
                    alt={stock.stockName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex justify-between w-full">
                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <div className="flex flex-col w-full max-w-[100px]">
                          <p className="text-sm font-bold">{stock.stockName}</p>
                          <p className="flex items-center text-gray-500 text-[10px]">
                            <FaWonSign className="w-3 h-3" />
                            <span className="ml-1">
                              {stock.avgPrice.toLocaleString()} 원
                            </span>
                            <span className="ml-1">({stock.stockCount}주)</span>
                          </p>
                        </div>
                        <div className="flex flex-col items-start">
                          <p
                            className={`text-sm ${
                              stock.profit >= 0
                                ? 'text-red-500'
                                : 'text-blue-500'
                            }`}
                          >
                            {stock.profit >= 0
                              ? `+${stock.profit.toLocaleString()}`
                              : stock.profit.toLocaleString()}{' '}
                            원
                          </p>
                          <p
                            className={`flex items-center text-sm ${
                              stock.profit >= 0
                                ? 'text-red-500'
                                : 'text-blue-500'
                            }`}
                          >
                            (
                            {(
                              (stock.profit /
                                (stock.avgPrice * stock.stockCount)) *
                              100
                            ).toFixed(2)}
                            <MdPercent />)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

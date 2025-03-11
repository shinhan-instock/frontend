import { useEffect, useState } from 'react';
import { FaWonSign } from 'react-icons/fa6';
import { MdPercent } from 'react-icons/md';
import { account } from '../../api/UserAPI';

export default function MyStock() {
  const [isLinked, setIsLinked] = useState(true);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    async function fetchAccountData() {
      try {
        const data = await account();
        if (data && data.length > 0) {
          setStockData(data);
          setIsLinked(true);
        } else {
          setIsLinked(false);
        }
      } catch (error) {
        setIsLinked(false);
      }
    }

    fetchAccountData();
  }, []);

  return (
    <div className="w-full mx-auto px-5">
      <div className="flex flex-col p-4 rounded-lg bg-instock-gray">
        <div className="flex mb-4 justify-center font-title">내 계좌</div>

        {/* 계좌 연동 X */}
        {!isLinked ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl text-gray-500">+</span>
            </div>
            <p className="mt-10 text-lg font-semibold">내 증권 계좌 연동하기</p>
            <p className="text-sm text-gray-500 font-title">
              다양한 서비스를 사용하기 위해 필요해요
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-64 overflow-auto">
            {stockData.map((stock, index) => (
              <div
                key={index}
                className="flex justify-between space-y-3 w-full"
              >
                <div className="flex flex-row space-x-3 w-full space-y-6">
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

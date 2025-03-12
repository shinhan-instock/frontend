import { HiOutlineX } from 'react-icons/hi';
import { FaWonSign } from 'react-icons/fa6';
import { MdPercent } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { getTop10Stocks } from '../../api/StockAPI.jsx';

const stockData = [
  {
    id: 1,
    name: 'IBK',
    img: '/img/stockImg.png',
    top: '▲',
  },
  {
    id: 2,
    name: 'Samsung',
    img: '/img/stockImg.png',
    top: '-',
  },
  {
    id: 3,
    name: 'LG',
    img: '/img/stockImg.png',
    top: '-',
  },
  {
    id: 4,
    name: 'Hyundai',
    img: '/img/stockImg.png',
    top: '▼',
  },
];
export default function TopStock() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    getTop10Stocks().then((data) => {
      const _stockData = [];

      if (sessionStorage.getItem("top_10_rank")) {
        const prevRankings = JSON.parse(sessionStorage.getItem("top_10_rank"));
        
        data.forEach((stock, data_idx) => {
          let top = '';

          prevRankings.forEach((item, prev_idx) => {
            if (stock.stockCode === item.id) {
              if (data_idx < prev_idx) {
                top = '▲';
              } else if (data_idx > prev_idx) {
                top = '▼';
              } else {
                top = '-';
              }
            }
          });

          _stockData.push({
            id: stock.stockCode,
            name: stock.stockName,
            img: `https://static.toss.im/png-icons/securities/icn-sec-fill-${stock.stockCode}.png`,
            top: (top === '' ? '▲' : top)
          });
        });
        setStockData(_stockData);
        sessionStorage.setItem("top_10_rank", JSON.stringify(_stockData));
      } else {
        data.forEach((stock) => {
          _stockData.push({
            id: stock.stockCode,
            name: stock.stockName,
            img: `https://static.toss.im/png-icons/securities/icn-sec-fill-${stock.stockCode}.png`,
            top: '-'
          });
        });
        setStockData(_stockData);
        sessionStorage.setItem("top_10_rank", JSON.stringify(_stockData));
      }
    });
  }, []);

  return (
    <div className="w-full mx-auto px-5">
      <div className="flex flex-col p-4 rounded-lg bg-instock-gray">
        <div className="flex mb-4 justify-center font-title">실시간 검색어</div>

        <div className="flex flex-col h-64 overflow-auto
          ">
          {stockData.map((stock) => (
            <div
              key={stock.id}
              className="flex justify-between space-y-3 w-full cursor-pointer hover:bg-gray-200 p-2 rounded-md"
              onClick={() => window.location.href = `/stock/${encodeURIComponent(stock.stockName)}`}
              >
              <div className="flex flex-row space-x-3 w-full">
                <img
                  src={stock.img}
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

import { HiOutlineX } from 'react-icons/hi';
import stockImg from '/img/stockImg.png';
import { FaWonSign } from 'react-icons/fa6';
import { MdPercent } from 'react-icons/md';
import { useState } from 'react';

const stockData = [
  {
    id: 1,
    name: 'IBK',
    price: '15,710,000',
    change: '+ 0.72',
    img: '/img/stockImg.png',
  },
  {
    id: 2,
    name: 'Samsung',
    price: '65,300',
    change: '+ 1.23',
    img: '/img/stockImg.png',
  },
  {
    id: 3,
    name: 'LG',
    price: '88,500',
    change: '- 0.45',
    img: '/img/stockImg.png',
  },
  {
    id: 4,
    name: 'Hyundai',
    price: '201,000',
    change: '+ 2.01',
    img: '/img/stockImg.png',
  },
  {
    id: 5,
    name: 'SK',
    price: '150,700',
    change: +'0.89',
    img: '/img/stockImg.png',
  },
];
export default function WatchList() {
  const [stocks, setStocks] = useState(stockData);

  const removeStocks = (id) => {
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

  return (
    <div className="w-full mx-auto px-5">
      <div className="flex flex-col p-4 rounded-lg bg-instock-gray">
        <div className="flex mb-4">
          <button className="w-auto bg-black text-zinc-100 font-medium px-4 rounded-2xl">
            + watchList
          </button>
        </div>
        <div className="flex flex-col h-64 overflow-auto">
          {stocks.map((stock) => (
            <div key={stock.id} className="flex justify-between space-y-3">
              <div className="flex flex-row space-x-3">
                <img
                  src={stock.img}
                  alt={stock.name}
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-bold">{stock.name}</p>
                    <p className="text-gray-500 text-sm flex items-center">
                      <p className="mr-1">현재가</p>
                      <FaWonSign className="w-3 h-3" />
                      <p className="ml-1">{stock.price}</p>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <p className="flex items-center text-red-500">
                  {stock.change}
                  <MdPercent />
                </p>
                <button
                  className="w-6 h-6 flex items-center rounded-full hover:bg-instock-gray justify-center"
                  onClick={() => removeStocks(stock.id)}
                >
                  <HiOutlineX className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

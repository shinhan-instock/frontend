import { HiOutlineX } from 'react-icons/hi';
import { FaWonSign } from 'react-icons/fa6';
import { MdPercent } from 'react-icons/md';
import { useState } from 'react';

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
  return (
    <div className="w-full mx-auto px-5">
      <div className="flex flex-col p-4 rounded-lg bg-instock-gray">
        <div className="flex mb-4 justify-center font-bold">실시간 검색어</div>

        <div className="flex flex-col h-64 overflow-auto">
          {stockData.map((stock) => (
            <div
              key={stock.id}
              className="flex justify-between space-y-3 w-full"
            >
              <div className="flex flex-row space-x-3 w-full">
                <img
                  src={stock.img}
                  alt={stock.name}
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex justify-between w-full">
                  <div className="flex w-full items-center">
                    <p className="text-m font-bold">{stock.name}</p>
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

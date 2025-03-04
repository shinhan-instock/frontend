import { HiOutlineX } from 'react-icons/hi';
import { FaWonSign } from 'react-icons/fa6';
import { MdPercent } from 'react-icons/md';
import { useState } from 'react';

const stockData = [
  {
    id: 1,
    name: 'IBK',
    price: '15,000',
    change_price: '+2,000',
    change: '+0.72',
    share: '2',
    img: '/img/stockImg.png',
  },
  {
    id: 2,
    name: 'Samsung',
    price: '65,300',
    change_price: '+2,000',
    change: '+1.23',
    share: '1',
    img: '/img/stockImg.png',
  },
  {
    id: 3,
    name: 'LG',
    price: '88,500',
    change_price: '-2,000',
    change: '- 0.45',
    share: '2',
    img: '/img/stockImg.png',
  },
  {
    id: 4,
    name: 'Hyundai',
    price: '201,000',
    change_price: '+20,000',
    change: '+ 2.01',
    share: '2',
    img: '/img/stockImg.png',
  },
];
export default function MyStock() {
  const [isLinked, setIsLinked] = useState(true); // 계좌 연동 여부

  return (
    <div className="w-full mx-auto px-5">
      <div className="flex flex-col p-4 rounded-lg bg-instock-gray">
        <div className="flex mb-4 justify-center font-bold">내 계좌</div>

        {/* 계좌 연동 X */}
        {!isLinked ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl text-gray-500">+</span>
            </div>
            <p className="mt-10 text-lg font-semibold">내 증권 계좌 연동하기</p>
            <p className="text-sm text-gray-500">
              다양한 서비스를 사용하기 위해 필요해요
            </p>
          </div>
        ) : (
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
                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <div className="flex flex-col w-full max-w-[100px]">
                          <p className="flex flex-col text-sm font-bold">
                            {stock.name}
                          </p>
                          <p className="flex items-center text-gray-500 text-sm">
                            <FaWonSign className="w-3 h-3" />
                            <p className="ml-1">{stock.price}</p>
                            <p className="ml-1">({stock.share}주)</p>
                          </p>
                        </div>
                        <div className="flex flex-col items-start ">
                          <p className="flex items-center text-sm text-red-500">
                            {stock.change_price}
                            <br />
                          </p>
                          <p className="flex items-center text-sm text-red-500">
                            ({stock.change}
                            <MdPercent />)
                          </p>{' '}
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

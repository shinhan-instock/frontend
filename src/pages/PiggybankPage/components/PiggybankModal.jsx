import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import WonFormatter from "../../../utils/WonFormatter";
import cryPig from "/img/crypig.png";
import { addDefaultImg } from "../../../utils/DefaultImage";
import { useLogin } from "../../../hooks/useLogin";
import { buyStock } from "../../../api/StockAPI";
import { useState } from "react";
import pig from "/img/piggybank.png";

export default function PiggybankModal({ stocks = [], isLinked, mileage }) {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };
  const [buy, setBuy] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  return buy === false ? (
    <div className="w-1/3 h-full flex flex-col items-center justify-center text-white p-5">
      <button
        className="absolute top-5 right-5 text-white text-3xl"
        onClick={handleClose}
      >
        <IoCloseCircle />
      </button>

      <h2 className="text-2xl font-bold mb-5">🔥 시가 총액 Top10 🔥</h2>

      <div className="w-full max-w-lg bg-white rounded-lg p-5 text-black shadow-lg h-11/12 overflow-auto">
        {stocks.length === 0 ? (
          <div className="flex flex-col items-center gap-10 pt-20">
            <p className="text-center text-xl"> 구매 가능한 종목이 없어요. </p>
            <img src={cryPig} className="w-1/2" alt="crying pig" />
            <p className="text-center text-xl"> 마일리지를 더 모아보세요! </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {stocks.map((stock, index) => (
              <TopResult
                key={index}
                stockName={stock.stockName}
                stockCode={stock.stockCode}
                price={stock.price}
                changeRate={stock.priceChange}
                isLinked={isLinked}
                setBuy={setBuy}
                setSelectedStock={setSelectedStock}
                mileage={mileage}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  ) : (
    <BuyResult
      stockName={selectedStock?.stockName}
      mileage={selectedStock?.mileage}
      price={selectedStock?.price}
    />
  );
}

function TopResult({
  stockName,
  stockCode,
  price,
  changeRate,
  isLinked,
  setBuy,
  setSelectedStock,
  mileage,
}) {
  const { userInfo } = useLogin();
  const handleStockClick = () => {
    if (isLinked) {
      buyStock(stockName, stockCode, price, userInfo.userId).then((result) => {
        console.log(result);
        setSelectedStock({
          stockName: stockName,
          mileage: mileage,
          price: price,
        });
        setBuy(true);
      });
    } else {
      alert("⚠️ 계좌 연동이 필요합니다! 먼저 계좌를 연동해주세요.");
    }
  };

  return (
    <div
      className="flex flex-row justify-between items-center py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100 transition duration-200"
      onClick={handleStockClick}
    >
      <div className="flex flex-row gap-5">
        <img
          src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stockCode}.png`}
          className="w-12 h-12 rounded-full shadow-md object-cover"
          onError={addDefaultImg}
        />

        <div className="flex flex-col">
          <div className="font-semibold">{stockName}</div>
          <div className="text-stroke-gray text-sm">{stockCode}</div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div>{WonFormatter.format(price)}</div>
        {changeRate > 0 ? (
          <div className="text-red-500 text-sm"> + {changeRate} %</div>
        ) : (
          <div className="text-blue-500 text-sm">{changeRate} %</div>
        )}
      </div>
    </div>
  );
}

function BuyResult({ stockName, mileage, price }) {
  const navigate = useNavigate();
  return (
    <div className="text-white flex flex-col gap-5 items-center">
      <div className="text-2xl">
        💸 {price} 마일리지로 {stockName} 주식을 구매했어요! 💸
      </div>
      <img src={pig} className="w-1/4" />
      <div className="text-xl">현재 남은 마일리지 : {mileage - price} </div>
      <button
        className="text-black  bg-red-300 w-1/4 rounded-2xl text-xl p-3 hover:bg-red-400"
        onClick={() => navigate("/")}
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}

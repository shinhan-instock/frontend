import stockImg from "/img/stockImg.png";
import WonFormatter from "../../../utils/WonFormatter";

const stockData = {
  stock_image: stockImg,
  stock_name: "현대자동차",
  stock_price: 199800,
  stock_change_rate: -1.9,
  stock_code: "11111",
};

export default function StockInfo() {
  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-row items-center justify-center w-4/5 pb-2 flex-wrap">
        <div className="flex flex-row items-center gap-4 w-full">
          <img src={stockData.stock_image} className="w-20 h-20 rounded-full" />
          <div className="flex flex-col items-start gap-1 ">
            <div className="text-xl font-semibold">{stockData.stock_name}</div>

            <div className="text-stroke-gray">
              {" "}
              {WonFormatter.format(stockData.stock_price)}
            </div>
            {stockData.stock_change_rate > 0 ? (
              <div className="font-bold text-xl text-red-500 ">
                + {stockData.stock_change_rate} %
              </div>
            ) : (
              <div className="font-bold text-xl text-blue-500">
                {stockData.stock_change_rate} %
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <button className="w-36 bg-black text-white  px-6 py-1 rounded-xl hover:bg-instock-gray hover:text-black">
            + watchlist
          </button>
        </div>
      </div>
    </div>
  );
}

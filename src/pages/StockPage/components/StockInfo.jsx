import stockImg from "/img/stockImg.png";

const stockData = {
  stock_image: stockImg,
  stock_name: "현대자동차",
  stock_price: 199800,
  stock_change_rate: -1.9,
  stock_code: "11111",
};

export default function StockInfo() {
  const WonFormat = new Intl.NumberFormat("kr-KR", {
    style: "currency",
    currency: "KRW",
  });
  return (
    <div className="flex flex-row items-center w-full justify-around pb-2 flex-wrap">
      <div className="flex flex-row items-center gap-4">
        <img src={stockData.stock_image} className="w-20 h-20 rounded-full" />
        <div className="flex flex-col items-start gap-1 ">
          <div className="text-xl font-semibold">{stockData.stock_name}</div>

          <div className="text-stroke-gray">
            {" "}
            {WonFormat.format(stockData.stock_price)}
          </div>
        </div>
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

      <button className="bg-black text-white  px-6 py-1 rounded-xl hover:bg-instock-gray hover:text-black">
        + watchlist
      </button>
    </div>
  );
}

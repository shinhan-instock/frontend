/* eslint-disable react/prop-types */
import WonFormatter from "../../../utils/WonFormatter";

export function UserSearchResult({ img, nickname, intro }) {
  return (
    <div className="flex flex-row gap-5 items-center py-2 border-b-1 border-instock-gray">
      <img src={img} className="w-12 h-12 rounded-full shadow-md " />

      <div className="flex flex-col">
        <div>{nickname}</div>
        <div className="text-stroke-gray text-sm"> {intro}</div>
      </div>
    </div>
  );
}

export function StockSearchResult({
  img,
  stockName,
  stockCode,
  price,
  changeRate,
}) {
  return (
    <div className="flex flex-row justify-between items-center py-2 border-b-1 border-instock-gray">
      <div className="flex flex-row gap-5">
        <img
          src={img}
          className="w-12 h-12 rounded-full shadow-md object-cover "
        />

        <div className="flex flex-col">
          <div>{stockName}</div>
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

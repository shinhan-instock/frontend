/* eslint-disable react/prop-types */
import ImageMaker from "../../../utils/ImageMaker";
import WonFormatter from "../../../utils/WonFormatter";
import { useNavigate } from "react-router-dom";
import { addDefaultImg } from "../../../utils/DefaultImage";

export function UserSearchResult({ img, nickname, intro, setIsSearchOpen }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-row gap-5 items-center py-2 border-b-1 border-instock-gray"
      onClick={() => {
        navigate(`/profile/${nickname}`);
        setIsSearchOpen(false);
      }}
    >
      {img == null ? (
        <ImageMaker nickname={nickname} />
      ) : (
        <img src={img} className="w-12 h-12 rounded-full shadow-md " />
      )}

      <div className="flex flex-col">
        <div>{nickname}</div>
        <div className="text-stroke-gray text-sm"> {intro}</div>
      </div>
    </div>
  );
}

export function StockSearchResult({ stockName, setIsSearchOpen }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-row justify-between items-center py-2 border-b-1 border-instock-gray cursor-pointer"
      onClick={() => {
        navigate(`/stock/${stockName}`);
        setIsSearchOpen(false);
      }}
    >
      {stockName}
    </div>
  );
}

export function TopResult({
  // img,
  stockName,
  stockCode,
  price,
  changeRate,
  setIsSearchOpen,
}) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-row justify-between items-center py-2 border-b-1 border-instock-gray cursor-pointer"
      onClick={() => {
        navigate(`/stock/${stockName}`);
        setIsSearchOpen(false);
      }}
    >
      <div className="flex flex-row gap-5">
        <img
          src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${stockCode}.png`}
          className="w-12 h-12 rounded-full shadow-md object-cover "
          onError={addDefaultImg}
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

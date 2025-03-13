import WonFormatter from "../../../utils/WonFormatter";
import { useNavigate } from "react-router-dom";

export default function RelatedStock({ name, price, change_rate }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-row justify-between p-2 px-3 items-center  hover:bg-instock-gray "
      onClick={() => navigate(`/stock/${name}`)}
    >
      <div className="flex flex-col">
        <div className="text-lg">{name}</div>
        <div className="text-stroke-gray text-md">
          {WonFormatter.format(price)}
        </div>
      </div>
      {change_rate > 0 ? (
        <div className="text-red-500 font-semibold"> + {change_rate} %</div>
      ) : (
        <div className="text-blue-500 font-semibold">{change_rate} %</div>
      )}
    </div>
  );
}

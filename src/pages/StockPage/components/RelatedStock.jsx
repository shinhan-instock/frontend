import WonFormatter from "../../../utils/WonFormatter";

export default function RelatedStock({ name, price, change_rate }) {
  return (
    <div className="flex flex-row justify-between pb-2 items-center">
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

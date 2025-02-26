import RelatedStock from "./RelatedStock";

const data = [
  { id: 1, name: "도이치 모터스", price: 15470, change_rate: 1.54 },
  { id: 2, name: "도이치 모터스", price: 15470, change_rate: 1.54 },
  { id: 3, name: "도이치 모터스", price: 15470, change_rate: 1.54 },
  { id: 4, name: "도이치 모터스", price: 15470, change_rate: 1.54 },
  { id: 5, name: "도이치 모터스", price: 15470, change_rate: 1.54 },
];

export default function RelatedStockList() {
  return (
    <div className="p-1">
      {data.map((stock) => (
        <RelatedStock
          key={stock.id}
          name={stock.name}
          price={stock.price}
          change_rate={stock.change_rate}
        />
      ))}
    </div>
  );
}

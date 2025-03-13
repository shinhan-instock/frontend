import RelatedStock from "./RelatedStock";

export default function RelatedStockList({ stockData }) {
  return (
    <div className="p-1">
      {stockData.map((stock) => (
        <RelatedStock
          key={stock.id}
          name={stock.stockName}
          price={stock.price}
          change_rate={stock.priceChange}
        />
      ))}
    </div>
  );
}

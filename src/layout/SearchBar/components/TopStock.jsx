import { StockSearchResultList } from "./SearchResultList";

export default function TopStock() {
  return (
    <div className="flex flex-col w-full">
      <div className="px-10 pt-5 text-lg">실시간 등락율 높은 주식 Top 20</div>
      <StockSearchResultList />
    </div>
  );
}

import RelatedStockList from "./RelatedStockList";

export default function RelatedStockTab() {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-text-blue  text-xl">기업 개요</div>
      <div className="bg-background-blue p-5 rounded-xl">
        <ul>
          <li>
            설명 ~~~~~~~~ ~~~~~~~~~~~설명 ~~~~~~~~~~~~~ ~~~~~~설명 ~~~~~~~~~~~~
            ~~~~~~~설명
          </li>
          <li>
            설명 ~~~~~~~~ ~~~~~~~~~~~설명 ~~~~~~~~~~~~~ ~~~~~~설명 ~~~~~~~~~~~~
            ~~~~~~~설명
          </li>
          <li>
            설명 ~~~~~~~~ ~~~~~~~~~~~설명 ~~~~~~~~~~~~~ ~~~~~~설명 ~~~~~~~~~~~~
            ~~~~~~~설명
          </li>
        </ul>
      </div>
      <div className="text-text-blue  text-xl">자동차 업종별 등락율 top5</div>
      <div className="bg-background-blue p-3 rounded-xl flex flex-row gap-4">
        <div className="bg-white w-1/2 p-5  rounded-xl">
          <RelatedStockList />
        </div>
        <div className="bg-white w-1/2 p-5  rounded-xl">
          <RelatedStockList />
        </div>
      </div>
    </div>
  );
}

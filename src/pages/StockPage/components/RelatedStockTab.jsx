import RelatedStockList from "./RelatedStockList";

export default function RelatedStockTab() {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-text-blue  text-xl">기업 개요</div>
      <div className="bg-background-blue p-5 rounded-xl">
        <ul>
          <li>
            승용, RV, 소형상용, 대형상용 등의 자동차 및 자동차부품을 제조 및
            판매하는 완성차 제조업체로 현대자동차그룹에 속하였으며,
            현대자동차그룹에는 동사를 포함한 국내 53개 계열회사가 있음.
          </li>{" "}
          <li>
            종속회사인 현대로템은 전차와 차륜형장갑차 등 방위사업, 철도차량
            제작, E&M 등 레일솔루션사업, 제철설비와 완성차 생산설비 등는
            에코플랜트사업을 영위함.{" "}
          </li>
          <li>금융 부문 종속회사로는 현대캐피탈과 현대카드가 있음.</li>
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

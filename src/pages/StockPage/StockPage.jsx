import { useState } from "react";
import NavigationBar from "../../components/common/NavigationBar";
import PostList from "../../components/common/PostList";
import StockInfo from "./components/StockInfo";
import StockEmotionTab from "./components/StockEmotionTab";
import RelatedStockTab from "./components/RelatedStockTab";

export default function StockPage() {
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="sticky flex w-4/5 justify-center">
        <StockInfo />
      </div>

      <div className="w-4/5">
        <div className="sticky flex w-full  bg-white border-b border-zinc-300 z-10">
          <NavigationBar
            menuType="stock"
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </div>

      <div className="p-5 w-full max-w-2xl overflow-auto flex-grow pb-20 ">
        {selectedTab === 1 ? (
          <PostList />
        ) : selectedTab === 2 ? (
          <StockEmotionTab />
        ) : (
          <RelatedStockTab />
        )}
      </div>
    </div>
  );
}

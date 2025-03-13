import { useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../../components/common/NavigationBar";
import PostList from "../../components/common/PostList";
import StockInfo from "./components/StockInfo";
import StockEmotionTab from "./components/StockEmotionTab";
import RelatedStockTab from "./components/RelatedStockTab";
import StockPostsData from "./components/StockPostsData";

export default function StockPage() {
  const stockName = useParams().stockname;
  const [stockDesc, setStockDesc] = useState("");
  const [selectedTab, setSelectedTab] = useState(1);
  const [postsData, setPostsData] = useState([]);
  const [sentimentNum, setSentimentNum] = useState(0);

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="px-3 sticky w-full flex flex-row justify-center">
        <StockInfo stockName={stockName} setStockDesc={setStockDesc} setSentimentNum={setSentimentNum}/>
      </div>

      <div className="w-4/5">
        {/* <div className="sticky flex w-full  bg-white border-b border-zinc-300 z-10"> */}
        <NavigationBar
          menuType="stock"
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {/* </div> */}
      </div>

      <div className="p-5 w-5/6 overflow-auto flex-grow pb-30">
        {selectedTab === 1 ? (
          <StockEmotionTab stockName={stockName} sentimentNum={sentimentNum}/>
        ) : selectedTab === 2 ? (
          <>
            <StockPostsData stockName={stockName} setPostsData={setPostsData} />
            <PostList postsData={postsData} />
          </>
        ) : (
          <RelatedStockTab stockName={stockName} stockDesc={stockDesc} />
        )}
      </div>
    </div>
  );
}

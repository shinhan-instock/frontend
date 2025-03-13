import Emotion from "./Emotion";
import EmotionChart from "./EmotionChart";

export default function StockEmotionTab({stockName, sentimentNum}) {
  return (
    <div className="flex flex-col gap-4 items-center w-full h-full">
      <Emotion sentimentNum={sentimentNum}/>
      <EmotionChart stockName={stockName} />
    </div>
  );
}

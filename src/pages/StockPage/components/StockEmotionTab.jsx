import { useState, useEffect } from "react";
import Emotion from "./Emotion";
import EmotionChart from "./EmotionChart";

export default function StockEmotionTab({ stockName, sentimentNum }) {
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 chartKey 값을 변경하여 EmotionChart를 한 번 더 렌더링
    setChartKey((prev) => prev + 1);
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center w-full h-full">
      <Emotion sentimentNum={sentimentNum} />
      <EmotionChart key={chartKey} stockName={stockName} />
    </div>
  );
}

import Emotion from "./Emotion";
import EmotionChart from "./EmotionChart";

export default function StockEmotionTab() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div>
        이 그래프는 24시간 동안의 관련주의 게시글을 감정분석하여 나타난
        지표입니다.
      </div>
      <Emotion />
      <div>과거 주식과 감정분석글을 한눈에 비교하기 !</div>
      <EmotionChart />
    </div>
  );
}

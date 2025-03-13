import emotionImg1 from "/img/sentiment1.png";
import emotionImg2 from "/img/sentiment2.png";
import emotionImg3 from "/img/sentiment3.png";

export function Card({ children, className = "" }) {
  return <div className={`rounded-lg shadow-md bg-white dark:bg-gray-800 p-4 ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = "" }) {
  return <div className={`border-b pb-2 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h2 className={`text-lg font-bold ${className}`}>{children}</h2>;
}

export function CardDescription({ children, className = "" }) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
}

export default function Emotion({sentimentNum}) {
  return (
    <Card className="md:col-span-1 w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">현재 감정 점수</CardTitle>
        <CardDescription>24시간 동안의 관련주의 게시글을 감정분석하여 나타난 지표입니다.</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="w-full flex flex-row justify-center items-center gap-3">
          <img src={sentimentNum < 33 ? emotionImg1 : sentimentNum < 66 ? emotionImg2 : emotionImg3} 
            className="w-60" 
          />

          <div
            className="flex items-center justify-center w-14 h-14 text-lg font-bold rounded-lg"
            style={{ backgroundColor: sentimentNum < 33 ? "#ff8576" : sentimentNum < 66 ? "#e1c871" : "#7ec6a2" }}
          >
            {sentimentNum === null ? '-' : sentimentNum}점
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

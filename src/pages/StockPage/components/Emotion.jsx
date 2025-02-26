import emotionImg from "/img/emotion1.jpg";

export default function Emotion() {
  return (
    <div className="w-full flex flex-row justify-center">
      <img src={emotionImg} className="w-3/4" />
    </div>
  );
}

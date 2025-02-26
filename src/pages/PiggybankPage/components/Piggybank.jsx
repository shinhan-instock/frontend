import { useEffect, useState } from "react";
import gsap from "gsap";
import piggybank from "/img/piggybank.png";
import stock from "/img/stockImg.png";
import PiggyBankCoin from "./PiggyBankCoin";

const stockIcons = [
  { src: stock, top: "25%", left: "10%" }, // 좌측 상단
  { src: stock, top: "25%", right: "15%" }, // 우측 상단
  { src: stock, bottom: "0%", right: "10%" }, // 우측 하단
  { src: stock, bottom: "0%", left: "15%" }, // 좌측 하단
  { src: stock, top: "0%", left: "45%" }, // 정중앙
];

export default function Piggybank() {
  const [showCoins, setShowCoins] = useState(false);

  useEffect(() => {
    const floatingAnimation = (selector, delayAfter, size) => {
      gsap.to(selector, {
        duration: Math.random() * 2 + 2, // 2~4초 사이 랜덤 지속시간
        delay: Math.random() * delayAfter,
        y: size, // 위아래 움직임

        rotation: Math.random() * 10 - 5, // 가벼운 회전 효과
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    };

    stockIcons.forEach((_, index) =>
      floatingAnimation(`.floating-${index}`, 1.5, 30)
    );
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center gap-15 relative">
      <div className="relative w-full flex justify-center">
        <img src={piggybank} alt="piggybank" className="w-1/2" />
        {stockIcons.map((icon, index) => (
          <img
            key={index}
            src={icon.src}
            alt={`stock-${index}`}
            className={`absolute floating-${index} w-[60px] h-[60px]`} // 크기 균일화
            style={{
              top: icon.top,
              left: icon.left,
              right: icon.right,
              bottom: icon.bottom,
            }}
          />
        ))}
      </div>
      <button
        onClick={() => setShowCoins(true)}
        className="bg-red-400 w-2/3 p-3 rounded-4xl text-lg text-white hover:bg-red-950 mt-5"
      >
        저금통 깨러 가기
      </button>
      {showCoins && <PiggyBankCoin />}
    </div>
  );
}

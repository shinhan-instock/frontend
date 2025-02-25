import { useEffect, useState } from "react";
import gsap from "gsap";
import piggybank from "/img/piggybank.png";
import stock from "/img/stockImg.png";
import PiggyBankCoin from "./PiggyBankCoin";

const stockIcons = [
  { src: stock, top: "0%", left: "15%" },
  { src: stock, top: "15%", right: "10%" },
  { src: stock, bottom: "10%", right: "5%" },
  { src: stock, bottom: "0%", left: "5%" },
  { src: stock, bottom: "0%", left: "5%" },
];

export default function Piggybank() {
  const [showCoins, setShowCoins] = useState(false); // ✅ 코인 효과 표시 여부 상태

  useEffect(() => {
    const floatingAnimation = (selector, delayAfter, size) => {
      gsap.to(selector, {
        duration: Math.random() * 1.5 + 1.5,
        delay: Math.random() * delayAfter,
        y: size,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    };

    stockIcons.forEach((_, index) =>
      floatingAnimation(`.floating-${index}`, 1, 20)
    );
  }, []);

  const getMileage = () => {
    console.log("clicked");
    setShowCoins(true);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center gap-15 relative">
      <div className="relative w-full flex justify-center">
        <img src={piggybank} alt="piggybank" className="w-1/2" />
        {stockIcons.map((icon, index) => (
          <img
            key={index}
            src={icon.src}
            alt={`stock-${index}`}
            className={`absolute floating-${index} w-[70px] h-[70px] `}
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
        onClick={getMileage}
        className="bg-red-400 w-2/3 p-3 rounded-4xl text-lg text-white hover:bg-red-950 mt-5"
      >
        저금통 깨러 가기
      </button>
      {showCoins && <PiggyBankCoin />}
    </div>
  );
}

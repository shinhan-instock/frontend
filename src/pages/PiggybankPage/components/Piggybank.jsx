import { useEffect } from "react";
import gsap from "gsap";
import piggybank from "/img/piggybank.png";
import stock from "/img/stockImg.png";
import bc from "/img/bc.png";
import kb from "/img/kb.png";

const stockIcons = [
  { src: stock, top: "5%", left: "15%", size: "w-[50px]" },
  { src: bc, top: "0%", right: "10%", size: "w-[60px]" },
  { src: kb, bottom: "10%", left: "20%", size: "w-[55px]" },
  { src: bc, top: "40%", right: "20%", size: "w-[45px]" },
  { src: kb, bottom: "5%", right: "15%", size: "w-[50px]" },
];

export default function Piggybank() {
  useEffect(() => {
    const floatingAnimation = (selector, delayAfter, size) => {
      gsap.to(selector, {
        duration: Math.random() * 1.5 + 1.5, // 1.5~3초 사이 랜덤 지속시간
        delay: Math.random() * delayAfter, // 0~1초 사이 랜덤 딜레이
        y: Math.random() > 0.5 ? size : -size, // 랜덤하게 위/아래로 이동
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    };

    stockIcons.forEach((_, index) =>
      floatingAnimation(`.floating-${index}`, 1, 35)
    );
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center gap-15">
      <div className="relative w-full flex justify-center">
        <img src={piggybank} alt="piggybank" className="w-[250px]" />
        {stockIcons.map((icon, index) => (
          <img
            key={index}
            src={icon.src}
            alt={`stock-${index}`}
            className={`absolute floating-${index} ${icon.size}`}
            style={{
              top: icon.top,
              left: icon.left,
              right: icon.right,
              bottom: icon.bottom,
            }}
          />
        ))}
      </div>

      <button className="bg-red-400 w-2/3 py-5 rounded-4xl text-xl text-red-950 z-100">
        저금통 깨러 가기
      </button>
    </div>
  );
}

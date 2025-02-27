import { useState } from "react";
import { motion } from "framer-motion";
import piggybank from "/img/piggybank.png";
import stock from "/img/stockImg.png";
import PiggyBankCoin from "./PiggyBankCoin";

const stockIcons = Array.from({ length: 8 }, (_, i) => ({
  src: stock,
  angle: i * (360 / 8),
}));

export default function Piggybank() {
  const [showCoins, setShowCoins] = useState(false);
  const radius = 180;

  return (
    <div className="w-full h-screen flex flex-col items-center gap-30 relative">
      <div className="relative w-full max-w-[400px] flex justify-center items-center">
        <motion.div
          className="absolute w-[400px] h-[400px] flex justify-center items-center z-5"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
        >
          {stockIcons.map((icon, index) => {
            const x = Math.cos((icon.angle * Math.PI) / 180) * radius;
            const y = Math.sin((icon.angle * Math.PI) / 180) * radius;
            return (
              <motion.img
                key={index}
                src={icon.src}
                alt={`stock-${index}`}
                className="absolute w-[50px] h-[50px]"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              />
            );
          })}
        </motion.div>

        <img src={piggybank} alt="piggybank" className="w-[250px] z-10" />
      </div>

      <button
        onClick={() => setShowCoins(true)}
        className="bg-red-400 w-2/3 py-5 rounded-4xl text-xl  text-red-950 z-100"
      >
        저금통 깨러 가기
      </button>

      {showCoins && <PiggyBankCoin />}
    </div>
  );
}

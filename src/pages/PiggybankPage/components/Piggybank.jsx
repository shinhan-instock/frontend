import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { IoCloseCircle } from 'react-icons/io5';
import piggybank from '/img/piggybank.png';
import stock from '/img/stockImg.png';
import bc from '/img/bc.png';
import kb from '/img/kb.png';
import PiggyBankCoin from './PiggybankModal';

const stockIcons = [
  { src: stock, top: '10%', left: '-50%', size: 'w-[50px]' },
  { src: bc, top: '20%', right: '-60%', size: 'w-[60px]' },
  { src: kb, bottom: '-25%', left: '-50%', size: 'w-[50px]' },
  { src: stock, top: '-50%', right: '25%', size: 'w-[55px]' },
  { src: bc, bottom: '-50%', right: '-20%', size: 'w-[45px]' },
];

export default function Piggybank() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isBroken, setIsBroken] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    stockIcons.forEach((_, index) => {
      gsap.to(`.floating-${index}`, {
        duration: Math.random() * 3 + 3,
        x: () => Math.random() * 50 - 25,
        y: () => Math.random() * 50 - 25,
        scale: () => Math.random() * 0.3 + 0.85,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, []);

  useEffect(() => {
    if (shouldNavigate) {
      navigate('/');
    }
  }, [shouldNavigate]);

  const handleBreak = () => {
    setIsBroken(true);
  };

  const handleClose = () => {
    setShouldNavigate(true);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center">
      <button
        className="absolute top-5 right-5 text-white text-3xl"
        onClick={handleClose}
      >
        <IoCloseCircle />
      </button>

      {isBroken ? (
        <PiggyBankCoin />
      ) : (
        <>
          <div className="relative flex justify-center">
            <img src={piggybank} alt="piggybank" className="w-[250px] z-10" />
            {stockIcons.map((icon, index) => (
              <img
                key={index}
                src={icon.src}
                alt={`stock-${index}`}
                className={`absolute floating-${index} ${icon.size} z-20`}
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
            className="bg-red-400 px-6 py-3 mt-6 rounded-4xl text-xl text-red-950 shadow-lg z-30"
            onClick={handleBreak}
          >
            저금통 깨러 가기
          </button>
        </>
      )}
    </div>
  );
}

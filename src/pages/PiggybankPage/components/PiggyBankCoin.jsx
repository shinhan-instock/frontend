import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import { loadImageShape } from "@tsparticles/shape-image";
import coinImg from "/img/coin.png";

export default function PiggyBankCoin() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadConfettiPreset(engine);
      await loadImageShape(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log("Particles Loaded:", container);
  };

  const options = useMemo(
    () => ({
      preset: "confetti",
      particles: {
        number: {
          value: 0, // 기본 개수는 0
        },
        color: {
          value: ["#FFD700", "#FFA500", "#FF4500"],
        },
        shape: {
          type: ["image"],
          options: {
            image: [
              {
                src: coinImg,
                width: 40,
                height: 40,
              },
            ],
          },
        },
        size: {
          value: { min: 40, max: 50 }, // 동전 크기 다양화
        },
        move: {
          direction: "bottom",
          enable: true,
          gravity: {
            enable: true,
            acceleration: 10, // 자연스럽게 떨어지는 느낌 강화
          },
          outModes: {
            default: "destroy", // 바닥에서 사라짐
          },
          speed: { min: 3, max: 8 }, // 속도 조정
        },
        rotate: {
          value: { min: 0, max: 360 },
          direction: "random",
          move: true,
          animation: {
            enable: true,
            speed: 10,
          },
        },
        tilt: {
          direction: "random",
          enable: true,
          move: true,
          value: { min: 0, max: 360 },
          animation: {
            enable: true,
            speed: 50,
          },
        },
        wobble: {
          distance: 20,
          enable: true,
          speed: { min: -5, max: 5 },
        },
        roll: {
          darken: { enable: true, value: 5 },
          enable: true,
          speed: { min: 5, max: 10 },
        },
      },
      emitters: {
        position: { x: 50, y: 20 }, // 화면 중앙보다 약간 위에서 떨어짐
        rate: { delay: 0.1, quantity: 1 }, // 한 번에 나오는 동전 개수 조정
        life: {
          count: 1,
          duration: 3, // 3초 동안만 동전이 떨어짐
        },
        size: { width: 200, height: 0 }, // 가로 범위를 200px로 조정 (500px 이하)
      },
    }),
    []
  );

  if (!init) {
    return <>로딩 중...</>;
  }

  return (
    <div className="w-[300px] h-[300px] relative">
      {" "}
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    </div>
  );
}

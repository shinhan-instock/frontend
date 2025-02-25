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
      fullScreen: {
        zIndex: 1,
      },
      particles: {
        number: {
          value: 0, // ❗ Emitter를 사용하므로 기본 생성 없음
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
          value: { min: 20, max: 50 }, // 동전 크기 다양하게 조정
        },
        move: {
          direction: "bottom",
          enable: true,
          gravity: {
            enable: true,
            acceleration: 15, // ✅ 중력 효과 추가
          },
          outModes: {
            default: "destroy", // ✅ 바닥에서 사라짐
          },
          speed: { min: 5, max: 15 }, // ✅ 더 빠르게 떨어짐
        },
        rotate: {
          value: { min: 0, max: 360 },
          direction: "random",
          move: true,
          animation: {
            enable: true,
            speed: 20, // ✅ 회전 속도 증가
          },
        },
        tilt: {
          direction: "random",
          enable: true,
          move: true,
          value: { min: 0, max: 360 },
          animation: {
            enable: true,
            speed: 100, // ✅ 기울기 애니메이션 속도 증가
          },
        },
        wobble: {
          distance: 30,
          enable: true,
          speed: { min: -10, max: 10 }, // ✅ 흔들리는 효과 추가
        },
        roll: {
          darken: { enable: true, value: 10 },
          enable: true,
          speed: { min: 10, max: 20 },
        },
      },
      emitters: {
        position: { x: 50, y: 10 }, // 중앙에서 조금 위쪽에 배치
        rate: { delay: 0.1, quantity: 50 },
        life: {
          count: 1,
          duration: 5,
        },
        size: { width: 150, height: 0 }, // width 값으로 동전 떨어지는 범위 조절
      },
    }),
    []
  );

  if (!init) {
    return <>로딩 중...</>;
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
    />
  );
}

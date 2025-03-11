import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function PiggyBankCoin() {
  const [coins, setCoins] = useState([]);

  const createCoin = () => {
    setCoins((prevCoins) => [
      ...prevCoins,
      {
        id: Date.now(),
        position: [Math.random() * 2 - 1, 3, Math.random() * 2 - 1], // 랜덤 위치에서 생성
      },
    ]);
  };

  return (
    <div className="w-screen h-screen fixed inset-0 pointer-events-none">
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 5, 2]} intensity={2} />
        <Suspense fallback={null}>
          {coins.map((coin) => (
            <CoinModel key={coin.id} startPosition={coin.position} />
          ))}
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* 버튼 클릭 시 동전 생성 */}
      <button
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-yellow-400 px-6 py-3 rounded-xl text-xl text-black shadow-lg"
        onClick={createCoin}
      >
        저금통 깨기
      </button>
    </div>
  );
}

// ✅ 3D 동전 모델 컴포넌트
function CoinModel({ startPosition }) {
  const { scene } = useGLTF('/models/coin.glb');
  const [position, setPosition] = useState(startPosition);

  useEffect(() => {
    gsap.to(position, {
      y: -2, // 바닥으로 떨어짐
      duration: Math.random() * 2 + 1.5, // 1.5 ~ 3.5초 랜덤
      ease: 'power1.in',
      onUpdate: () => setPosition([...position]),
      onComplete: () => setPosition(null), // 바닥에 도착하면 제거
    });

    gsap.to(scene.rotation, {
      x: Math.random() * Math.PI * 2,
      y: Math.random() * Math.PI * 2,
      z: Math.random() * Math.PI * 2,
      duration: Math.random() * 2 + 1.5,
      repeat: -1,
      ease: 'linear',
    });
  }, []);

  if (!position) return null; // 바닥에 닿으면 사라짐

  return <primitive object={scene} scale={0.5} position={position} />;
}

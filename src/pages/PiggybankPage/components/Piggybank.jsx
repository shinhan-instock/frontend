import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { IoCloseCircle } from "react-icons/io5";
import piggybank from "/img/piggybank.png";
import PiggybankModal from "./PiggybankModal";
import { getMileage } from "../../../api/PigAPI";
import { useLogin } from "../../../hooks/useLogin";
import { EventSourcePolyfill } from "event-source-polyfill";
import { account } from "../../../api/UserAPI";

const BASE_URL = "https://api.inst00ck.shop";

export default function Piggybank() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isBroken, setIsBroken] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [mileage, setMileage] = useState();
  const { userInfo } = useLogin();
  const [stocks, setStocks] = useState([]);
  const [stockCodes, setStockCodes] = useState([]);
  const [isLinked, setIsLinked] = useState(false);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    getMileage(userInfo.userId).then((result) => {
      setMileage(result.mileage);
    });
  }, []);

  useEffect(() => {
    if (!userInfo?.userId) return;

    const checkAccountStatus = () => {
      account(
        userInfo,
        (data) => {
          if (data?.code === "STOCK4004") {
            console.warn("📢 계좌 없음 (STOCK4004 감지)");
            setIsLinked(false);
          } else {
            setIsLinked(true);
          }
        },
        (error) => {
          setIsLinked(false);
        }
      );
    };

    checkAccountStatus();

    const connectSSE = () => {
      eventSourceRef.current = new EventSourcePolyfill(
        `${BASE_URL}/stocks/pigs/stream`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.userId}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      eventSourceRef.current.onmessage = (event) => {
        try {
          const newStocks = JSON.parse(event.data);
          setStocks(newStocks);

          const stockCodeList = newStocks.map((stock) => stock.stockCode);
          setStockCodes(stockCodeList);
        } catch (error) {
          console.error("❌ SSE 데이터 처리 오류:", error);
        }
      };

      eventSourceRef.current.onerror = () => {
        eventSourceRef.current.close();
        setTimeout(connectSSE, 3000); // 3초 후 재연결
      };
    };

    connectSSE();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [userInfo]);

  useEffect(() => {
    if (shouldNavigate) {
      navigate("/");
    }
  }, [shouldNavigate]);

  const stockIcons = [
    { code: stocks[0]?.stockCode, top: "10%", left: "-50%", size: "w-[50px]" },
    { code: stocks[1]?.stockCode, top: "20%", right: "-60%", size: "w-[60px]" },
    {
      code: stocks[2]?.stockCode,
      bottom: "-25%",
      left: "-50%",
      size: "w-[50px]",
    },
    { code: stocks[3]?.stockCode, top: "-50%", right: "25%", size: "w-[55px]" },
    {
      code: stocks[4]?.stockCode,
      bottom: "-50%",
      right: "-20%",
      size: "w-[45px]",
    },
  ];

  useEffect(() => {
    stockIcons.forEach((_, index) => {
      gsap.to(`.floating-${index}`, {
        duration: Math.random() * 3 + 3,
        x: () => Math.random() * 50 - 25,
        y: () => Math.random() * 50 - 25,
        scale: () => Math.random() * 0.3 + 0.85,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, [stockCodes]);

  const handleBreak = () => {
    setIsBroken(true);
  };

  const handleClose = () => {
    setShouldNavigate(true);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center overflow-hidden">
      <button
        className="absolute top-5 right-5 text-white text-3xl"
        onClick={handleClose}
      >
        <IoCloseCircle />
      </button>

      {isBroken ? (
        <PiggybankModal stocks={stocks} isLinked={isLinked} />
      ) : (
        <>
          <div className="text-white text-2xl pb-10">
            {mileage} 마일리지를 모았어요!
          </div>
          <div className="relative flex justify-center">
            <img src={piggybank} alt="piggybank" className="w-[250px] z-10" />
            {stocks.length !== 0 &&
              stockIcons.map((icon, index) => (
                <img
                  key={index}
                  src={`https://static.toss.im/png-icons/securities/icn-sec-fill-${icon.code}.png`}
                  alt={`stock-${index}`}
                  className={`absolute floating-${index} ${icon.size} z-20 rounded-full`}
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
            className="bg-red-400 px-6 w-100 py-3 mt-8 rounded-4xl text-xl text-red-950 shadow-lg z-30"
            onClick={handleBreak}
          >
            저금통 깨러 가기
          </button>
        </>
      )}
    </div>
  );
}

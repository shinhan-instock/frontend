/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { StockItem, InfluencerStockItem } from "./StockItem";
import { getUserAccount } from "../../../api/UserAPI";
import { useLogin } from "../../../hooks/useLogin";

export default function StockList({ userData }) {
  const [stock, setStock] = useState([]);
  const [isLinked, setIsLinked] = useState(true);
  const { userInfo } = useLogin();
  const [error, setError] = useState(false);
  // 1 : 남이 인플루언서, 2: 남이 일반 공개 계좌, 3: 남이 계좌 공개 안함, 4: 내가 계좌 개설 안함
  const [option, setOption] = useState(0);

  useEffect(() => {
    if (!userInfo?.userId || !userData?.userId) return;

    const closeSSE1 = getUserAccount(
      userInfo.userId,
      userData.userId,
      (data) => {
        if (data.code === "USER4011") {
          setOption(3);
        } else if (!data || data.success === false) {
          console.log("ddddd", data);
          setStock([]);
          setError(true);
        } else {
          setStock(data);
          setError(false);
        }
      },
      (error) => {
        console.error("SSE 오류 발생:", error);
        setError(true);
      }
    );

    const closeSSE2 = getUserAccount(
      userInfo.userId,
      userInfo.userId,
      (data) => {
        console.log(data);
        if (
          data.length > 0 ||
          data.message === "보유주식 list에 해당 주식이 없습니다."
        ) {
          setIsLinked(true);
          setError(false);
        } else {
          setIsLinked(false);
          setError(true);
        }
      },
      (error) => {
        console.error("SSE 오류 발생:", error);
      }
    );

    return () => {
      closeSSE1();
      closeSSE2();
    };
  }, [userInfo?.userId, userData?.userId]);

  useEffect(() => {
    let newOption = 0;

    if (!isLinked) {
      newOption = 4;
    } else if (userData.influencer) {
      newOption = 1;
    } else if (userData.openAccount) {
      newOption = 2;
    } else {
      newOption = 3;
    }

    console.log("현재 옵션:", newOption);
    setOption(newOption);
  }, [isLinked, userData, userInfo]);

  return (
    <div>
      {!userInfo && (
        <div>다른 유저의 계좌를 구경하려면 로그인이 필요해요 😊</div>
      )}
      {stock.length > 0 && !error && (
        <>
          {option === 1 &&
            stock.map((item) => (
              <InfluencerStockItem key={item.stockCode} stock={item} />
            ))}

          {option === 2 &&
            stock.map((item) => (
              <StockItem key={item.stockCode} stock={item} />
            ))}
        </>
      )}

      {option === 3 && <div>계좌를 공개하지 않은 유저입니다 😅 </div>}

      {option === 4 && (
        <div>
          아직 계좌를 연동하지 않았어요. 다른 유저의 계좌를 보고 싶다면 계좌
          연동을 해주세요! 😊
        </div>
      )}
      {option !== 4 && error && (
        <div>아직 {userData.nickname}님이 보유한 주식이 없어요 😅</div>
      )}
    </div>
  );
}

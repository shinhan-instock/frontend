/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { StockItem, InfluencerStockItem } from "./StockItem";
import { getUserAccount, account } from "../../../api/UserAPI";
import { useLogin } from "../../../hooks/useLogin";

export default function StockList({ userData }) {
  const [stock, setStock] = useState([]);
  const [isLinked, setIsLinked] = useState(true);
  const { userInfo } = useLogin();
  // 1 : 남이 인플루언서, 2: 남이 일반 공개 계좌 , 3: 남이 계좌 공개 안함, 4: 내가 계좌 개설 안함
  const [option, setOption] = useState(0);
  console.log("option", option, "linked", isLinked);
  console.log("userData", userData);
  console.log("userInfo", userInfo);

  useEffect(() => {
    if (!userInfo?.userId || !userData?.userId) return;

    getUserAccount(userInfo.userId, userData.userId).then((result) => {
      if (typeof result === "string") {
        setStock([]);
      } else {
        setStock(result);
      }
    });

    getUserAccount(userInfo.userId, userInfo.userId).then((result) => {
      console.log("myacc", result);
      if (result === "보유주식 list에 해당 주식이 없습니다.") {
        setIsLinked(true);
      } else if (typeof result === "string") {
        setIsLinked(false);
      } else {
        setIsLinked(true);
      }
    });
  }, [userInfo?.userId, userData?.userId]);

  useEffect(() => {
    if (!userData) return;

    let newOption = 0;

    if (userData.influencer) {
      newOption = isLinked ? 1 : 4;
    } else if (userData.openAccount) {
      newOption = isLinked ? 2 : 4;
    } else {
      newOption = 3;
    }

    if (!isLinked) {
      newOption = 4;
    }

    setOption(newOption);
  }, [isLinked, userData]);

  return (
    <div>
      {stock.length > 0 && (
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

      {option === 3 && <div>계좌를 공개하지 않은 유저입니다.</div>}

      {option === 4 && (
        <div>
          아직 계좌를 연동하지 않았어요. Instocker 의 계좌를 보고 싶다면 계좌
          연동을 해주세요!
        </div>
      )}
    </div>
  );
}

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { StockItem, InfluencerStockItem } from "./StockItem";
import { getUserAccount } from "../../../api/UserAPI";
import { useLogin } from "../../../hooks/useLogin";

export default function StockList({ userId }) {
  const [stock, setStock] = useState([]);
  const { userInfo } = useLogin();
  useEffect(() => {
    getUserAccount(userInfo.userId, userId).then((result) => setStock(result));
  }, []);
  return (
    <div>
      {stock.map((item) => (
        <div key={item.id}>
          {/* 인플루언서면 ? */}
          <InfluencerStockItem key={item.id} stock={item} />
          {/* 아니면 ? */}
          <StockItem key={item.id} stock={item} />
        </div>
      ))}{" "}
      {/* 내가 계좌 공개 안하면 ? */}
      <div>
        아직 계좌를 연동하지 않았어요. instocker 의 계좌를 보고싶으면 계좌
        연동을 해주세요!
      </div>
      {/* 남이 계좌 공개 안하면 ? */}
      <div>계좌를 공개하지 않은 유저</div>
    </div>
  );
}

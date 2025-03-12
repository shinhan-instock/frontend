/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { getStockPosts } from "../../../api/PostAPI";
import { useLogin } from "../../../hooks/useLogin";

export default function StockPostsData({ stockName, setPostsData }) {
  const { userInfo } = useLogin();
  const userId = userInfo.userId ? userInfo.userId : null;
  useEffect(() => {
    getStockPosts(stockName, userId).then((data) => {
      setPostsData(data);
    });
  }, [stockName]);
  return <div></div>;
}

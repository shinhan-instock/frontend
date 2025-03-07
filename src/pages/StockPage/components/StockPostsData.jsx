/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { getStockPosts } from "../../../api/PostAPI";

export default function StockPostsData({ stockName, setPostsData }) {
  console.log(stockName);
  useEffect(() => {
    getStockPosts(stockName).then((data) => {
      setPostsData(data);
    });
  }, [stockName]);
  return <div></div>;
}

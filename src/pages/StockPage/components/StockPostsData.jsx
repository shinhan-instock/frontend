/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { getStockPosts } from "../../../api/PostAPI";

export default function StockPostsData({ stockName, setPostsData }) {
  useEffect(() => {
    getStockPosts(stockName).then((data) => {
      setPostsData(data);
    });
  }, []);
  return <div></div>;
}

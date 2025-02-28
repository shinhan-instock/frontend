/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { getAllPosts } from "../../../api/PostAPI";

export default function StockPostsData({ selectedTab, setPostsData }) {
  useEffect(() => {
    getAllPosts(false, false, false, 1).then((data) => {
      setPostsData(data);
    });
  }, [selectedTab]);
  return <div></div>;
}

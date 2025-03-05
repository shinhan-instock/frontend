/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { getMyPosts } from "../../../api/PostAPI";

export default function ProfilePostsData({ selectedTab, setPostsData }) {
  useEffect(() => {
    getMyPosts("pda").then((data) => {
      setPostsData(data);
    });
  }, [selectedTab]);
  return <div></div>;
}

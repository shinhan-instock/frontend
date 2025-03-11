/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { getMyPosts } from "../../../api/PostAPI";
import { getPostsByUser } from "../../../api/PostAPI";

export default function ProfilePostsData({
  selectedTab,
  setPostsData,
  nickname,
}) {
  useEffect(() => {
    getPostsByUser(nickname).then((data) => {
      setPostsData(data);
    });
  }, [selectedTab]);
  return <div></div>;
}

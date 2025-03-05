/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { getMyPosts } from "../../../api/PostAPI";

export default function MyProfilePostsData({
  selectedTab,
  setPostsData,
  userId,
}) {
  useEffect(() => {
    getMyPosts(userId).then((data) => {
      setPostsData(data);
    });
  }, [selectedTab]);
  return <div></div>;
}

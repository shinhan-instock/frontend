/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { getMyPosts } from "../../../api/PostAPI";
import { getAllPosts } from "../../../api/PostAPI";

export default function MyProfilePostsData({
  selectedTab,
  setPostsData,
  userId,
}) {
  useEffect(() => {
    if (selectedTab == 1) {
      getMyPosts(userId).then((data) => {
        setPostsData(data);
      });
    } else if (selectedTab == 2) {
      getAllPosts(false, false, true, userId).then((data) => {
        setPostsData(data);
      });
    }
  }, [selectedTab]);
  return <div></div>;
}

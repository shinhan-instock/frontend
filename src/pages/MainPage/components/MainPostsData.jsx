/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { getAllPosts } from "../../../api/PostAPI";
import { useLogin } from "../../../hooks/useLogin";

export default function MainPostsData({ selectedTab, setPostsData }) {
  const { userInfo } = useLogin();
  console.log("user", userInfo);
  const userId = userInfo ? userInfo.id : null;
  useEffect(() => {
    let following = false;
    let popular = false;
    let scrap = false;

    if (selectedTab === 2) {
      following = true;
    } else if (selectedTab === 3) {
      popular = true;
    }

    getAllPosts(following, popular, scrap, userId).then((data) => {
      setPostsData(data);
    });
  }, [selectedTab]);
  return <div></div>;
}

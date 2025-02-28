/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { getAllPosts } from "../../../api/PostAPI";

export default function MainPostsData({ selectedTab, setPostsData }) {
  useEffect(() => {
    let following = false;
    let popular = false;
    let scrap = false;

    if (selectedTab === 2) {
      following = true;
    } else if (selectedTab === 3) {
      popular = true;
    }

    getAllPosts(following, popular, scrap, 1).then((data) => {
      setPostsData(data);
    });
  }, [selectedTab]);
  return <div></div>;
}

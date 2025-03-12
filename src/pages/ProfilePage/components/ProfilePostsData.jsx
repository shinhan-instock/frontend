/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { getPostsByUser } from "../../../api/PostAPI";
import { useLogin } from "../../../hooks/useLogin";

export default function ProfilePostsData({
  selectedTab,
  setPostsData,
  nickname,
}) {
  const { userInfo } = useLogin();
  const userId = userInfo ? userInfo.userId : null;
  useEffect(() => {
    if (selectedTab !== 1 || !nickname) return;

    setPostsData([]);

    getPostsByUser(nickname, userId).then((data) => {
      setPostsData(data);
    });
  }, [selectedTab, nickname]);

  return null;
}

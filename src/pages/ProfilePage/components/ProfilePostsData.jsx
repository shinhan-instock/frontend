/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { getPostsByUser } from '../../../api/PostAPI';

export default function ProfilePostsData({
  selectedTab,
  setPostsData,
  nickname,
}) {
  useEffect(() => {
    if (selectedTab !== 1 || !nickname) return; 

    setPostsData([]); 

    getPostsByUser(nickname).then((data) => {
      setPostsData(data);
    });
  }, [selectedTab, nickname]); 

  return null;
}

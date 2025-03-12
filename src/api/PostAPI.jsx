import axios from "axios";
const BASE_URL = "http://localhost:8080";

export async function getAllPosts(following, popular, scrap, userId) {
  let res = "";
  if (userId !== null) {
    res = await axios.get(
      `${BASE_URL}/posts/?following=${following}&popular=${popular}&scrap=${scrap}`,
      { headers: { Authorization: `Bearer ${userId}` } }
    );
  } else {
    res = await axios.get(
      `${BASE_URL}/posts/?following=${following}&popular=${popular}&scrap=${scrap}`
    );
  }

  const data = res.data.result;
  return data;
}

export async function getPost(postId) {
  const res = await axios.get(`${BASE_URL}/posts/${postId}`);
  const data = res.data.result;
  return data;
}

export async function getStockPosts(stockName, userId) {
  let res = "";
  if (userId !== null) {
    res = await axios.get(
      `${BASE_URL}/posts/stocks/${stockName}`,

      {
        headers: { Authorization: `Bearer ${userId}` },
      }
    );
  } else {
    res = await axios.get(`${BASE_URL}/posts/stocks/${stockName}`);
  }

  const data = res.data.result;
  return data;
}

export async function getMyPosts(userId) {
  const res = await axios.get(`${BASE_URL}/posts/my`, {
    headers: { Authorization: `Bearer ${userId}` },
  });
  const data = res.data.result;
  return data;
}

export async function getPostsByUser(nickname, userId) {
  let res = "";
  if (userId !== null) {
    res = await axios.post(
      `${BASE_URL}/posts/user`,
      {
        nickname: nickname,
      },
      {
        headers: { Authorization: `Bearer ${userId}` },
      }
    );
  } else {
    res = await axios.post(`${BASE_URL}/posts/user`, {
      nickname: nickname,
    });
  }
  const data = res.data.result;
  return data;
}

export async function addScrap(postId, userId) {
  const res = await axios.post(
    `${BASE_URL}/posts/${postId}/scrap`,
    {},
    {
      headers: { Authorization: `Bearer ${userId}` },
    }
  );
  console.log("add scrap", res);
  const data = res.data.result;
  return data;
}

export async function addLike(postId, userId) {
  const res = await axios.post(
    `${BASE_URL}/posts/${postId}/like`,
    {},
    {
      headers: { Authorization: `Bearer ${userId}` },
    }
  );

  const data = res.data.result;
  return data;
}

export async function deleteScrap(postId, userId) {
  const res = await axios.delete(`${BASE_URL}/posts/${postId}/scrap`, {
    headers: { Authorization: `Bearer ${userId}` },
  });
  const data = res.data.result;
  console.log("delete scrap", res);
  return data;
}

export async function deleteLike(postId, userId) {
  const res = await axios.delete(`${BASE_URL}/posts/${postId}/like`, {
    headers: { Authorization: `Bearer ${userId}` },
  });
  const data = res.data.result;
  return data;
}

export async function getLikeByUser(userId, postId) {
  const res = await axios.get(`${BASE_URL}/posts/${postId}/like`, {
    headers: { Authorization: `Bearer ${userId}` },
  });
  const data = res.data.result;
  return data;
}

export async function deletePost(postId, userId) {
  const res = await axios.delete(`${BASE_URL}/posts/${postId}`, {
    headers: { Authorization: `Bearer ${userId}` },
  });
  const data = res.data.result;
  return data;
}

export async function editPost(postId, userId, content, hashtag, images) {
  const res = await axios.put(
    `${BASE_URL}/posts/${postId}`,
    { content: content, hashtag: hashtag, images: images },
    {
      headers: { Authorization: `Bearer ${userId}` },
    }
  );
  const data = res.data.result;
  return data;
}

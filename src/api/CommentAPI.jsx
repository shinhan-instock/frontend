import axios from "axios";
const BASE_URL = "http://localhost:8080";

export async function getComments(postId, lastCommentId, limit) {
  let url = "";
  if (lastCommentId !== null) {
    url = `${BASE_URL}/comment/post/${postId}/infinite?lastCommentId=${lastCommentId}&limit=${limit}`;
  } else {
    url = `${BASE_URL}/comment/post/${postId}/infinite?limit=${limit}`;
  }
  const res = await axios.get(url);
  const data = res.data;
  return data;
}

export async function addComment(postId, userId, content) {
  const res = await axios.post(`${BASE_URL}/comment`, {
    postId: postId,
    userId: userId,
    content: content,
  });
  const data = res.data;
  console.log("data", res);
  return data;
}

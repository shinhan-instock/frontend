import axios from "axios";
const BASE_URL = "http://localhost:8080";

export function getComments(postId, lastCommentId, limit) {
  const res = axios.get(
    `${BASE_URL}/comments/post/${postId}/infinite?lastCommentId=${lastCommentId}&limit=${limit}`
  );
  const data = res.data.result;
  return data;
}

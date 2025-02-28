import axios from "axios";
const BASE_URL = "http://localhost:8080";

export async function getAllPosts(following, popular, scrap, user_id) {
  const res = await axios.get(
    `${BASE_URL}/posts/?following=${following}&popular=${popular}&scrap=${scrap}&user_id=${user_id}`
  );
  console.log(res);
  const data = res.data.result;
  return data;
}

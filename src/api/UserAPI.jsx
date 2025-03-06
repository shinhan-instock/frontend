import axios from "axios";
const BASE_URL = "http://localhost:8080";

export async function Login(userId, password) {
  const res = await axios.post(`${BASE_URL}/users/login`, {
    userId: userId,
    password: password,
  });
  const data = res.data.result;
  return data;
}

export async function SearchUser(userId) {
  const res = await axios.get(`${BASE_URL}/users/search?keyword=${userId}`);
  const data = res.data.result;
  console.log("res", userId, res);
  return data;
}

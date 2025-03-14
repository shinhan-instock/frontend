import axios from "axios";
const BASE_URL = "http://localhost:8082";

export async function getMileage(userId) {
  const res = await axios.get(`${BASE_URL}/mileage`, {
    headers: { Authorization: `Bearer ${userId} ` },
  });
  const data = res.data;
  return data;
}

import axios from "axios";
const BASE_URL = "https://api.inst00ck.shop";

export async function getMileage(userId) {
  const res = await axios.get(`${BASE_URL}/mileage`, {
    headers: { Authorization: `Bearer ${userId} ` },
  });
  const data = res.data;
  return data;
}

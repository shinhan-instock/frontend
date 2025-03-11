import axios from "axios";
const BASE_URL = "http://localhost:8081";

export async function getStockSearch(stockName) {
  const res = await axios.get(
    `${BASE_URL}/stock/search/data?stockNames=${stockName}`
  );
  const data = res.data.result;
  return data;
}

export async function getStockInfo(stockName) {
  const res = await axios.get(`${BASE_URL}/stocks/${stockName}`);
  const data = res.data;
  return data;
}

export async function getTopStocks() {
  const res = await axios.get(`${BASE_URL}/stocks/rankings/top20`);
  const data = res.data;
  return data;
}

export async function getRelatedStocks(stockName) {
  const res = await axios.get(
    `${BASE_URL}/stocks/rankings/${stockName}/theme `
  );
  console.log(res.data);
  const data = res.data;
  return data;
}

export async function getHashtagList(userId) {
  const res = await axios.get(`${BASE_URL}/stocks/search/hashtag`, {
    headers: { Authorization: `Bearer ${userId}` },
  });
  return res.data;
}

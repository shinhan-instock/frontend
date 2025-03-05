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
  const res = await axios.get(`${BASE_URL}/api/stocks/${stockName}`);
  const data = res.data;
  return data;
}

export async function getTopStocks() {
  const res = await axios.get(`${BASE_URL}/api/stocks/rankings/top20`);
  const data = res.data;
  return data;
}

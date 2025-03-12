import axios from "axios";
const BASE_URL = "http://localhost:8081";

export async function getStockSearch(stockName) {
  const res = await axios.get(
    `${BASE_URL}/stock/search/data?stockNames=${stockName}`
  );
  const data = res.data.result;
  return data;
}

export async function getStockInfo(stockName, userId) {
  console.log("usere", userId);
  if (userId == null) {
    const res = await axios.get(`${BASE_URL}/stocks/${stockName}`);
    return res.data;
  } else {
    const res = await axios.get(`${BASE_URL}/stocks/${stockName}`, {
      headers: { Authorization: `Bearer ${userId}` },
    });
    return res.data;
  }
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

export async function getChartData(stockName) {
  const res = await axios.get(`${BASE_URL}/stocks/chart/${stockName}`);
  const data = res.data;
  return data;
}

// 언급이 많이된 주식(글 검색창)으로 언급많이된 종목 TOP10뽑음 
export async function getTop10Stocks() {
  const res = await axios.get(`${BASE_URL}/stocks/rankings/top10`);
  const data = res.data;
  return data;
}
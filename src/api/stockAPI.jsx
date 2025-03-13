import axios from "axios";
const BASE_URL = "http://localhost:8081";

export async function getStockSearch(stockName) {
  const res = await axios.get(
    `${BASE_URL}/stock/search/data?stockNames=${stockName}`
  );
  const data = res.data.result;
  return data;
}

export function getStockInfo(stockName, userId, onMessage, onError) {
  const url = userId
    ? `${BASE_URL}/stocks/${stockName}/stream?userId=${userId}`
    : `${BASE_URL}/stocks/${stockName}/stream`;

  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    try {
      const jsonData = JSON.parse(event.data);
      if (onMessage) {
        onMessage(jsonData);
      }
    } catch (error) {
      console.error("JSON 파싱 오류:", error);
    }
  };

  eventSource.onerror = (error) => {
    console.error("SSE 연결 오류:", error);
    if (onError) {
      onError(error);
    }
    eventSource.close();
  };

  return () => {
    eventSource.close();
  };
}

export async function getTopStocks() {
  const res = await axios.get(`${BASE_URL}/stocks/rankings/top20`);
  const data = res.data;
  return data;
}

export function getRelatedStocks(stockName, onMessage, onError) {
  const eventSource = new EventSource(
    `${BASE_URL}/stocks/rankings/${stockName}/theme/stream`
  );

  eventSource.onmessage = (event) => {
    try {
      const jsonData = JSON.parse(event.data);
      if (onMessage) {
        onMessage(jsonData);
      }
    } catch (error) {
      console.error("JSON 파싱 오류:", error);
    }
  };
  eventSource.onerror = (error) => {
    console.error("SSE 연결 오류:", error);
    if (onError) {
      onError(error);
    }
    eventSource.close();
  };
  return () => {
    console.log("SSE 연결 종료");
    eventSource.close();
  };
}

export async function getHashtagList(userId) {
  const res = await axios.get(`${BASE_URL}/stocks/search/hashtag`, {
    headers: { Authorization: `Bearer ${userId} ` },
  });
  return res.data;
}

export async function getChartData(stockName) {
  const res = await axios.get(`${BASE_URL}/stocks/chart/${stockName}`);
  const data = res.data;
  return data;
}

export function getTop10Stocks(onMessage, onError) {
  const eventSource = new EventSource(`${BASE_URL}/stocks/rankings/top10/stream`);

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (onMessage) {
      onMessage(data);
    }
  };

  eventSource.onerror = (error) => {
    if (onError) {
      onError(error);
    }
    eventSource.close();
  };

  return () => {
    eventSource.close();
  };
}

export async function searchStock(keyword) {
  const res = await axios.get(`${BASE_URL}/stocks/search?stockName=${keyword}`);
  console.log(keyword, res);
  const data = res.data;
  return data;
}

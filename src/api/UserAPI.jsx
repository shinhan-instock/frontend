import axios from "axios";
const BASE_URL = "http://localhost:8080";

export async function login(userId, password) {
  const res = await axios.post(`${BASE_URL}/users/login`, {
    userId: userId,
    password: password,
  });
  const data = res.data.result;
  return data;
}

export async function searchUser(userId) {
  const res = await axios.get(`${BASE_URL}/users/search?keyword=${userId}`);
  const data = res.data.result;
  return data;
}

export function getWatchList(userId, onMessage, onError) {
  if (!userId) return () => {};
  const eventSource = new EventSource(
    `http://localhost:8080/watchList?userId=${userId}&page=0&size=5`
  );

  eventSource.onmessage = (event) => {
    try {
      const jsonData = JSON.parse(event.data);
      console.log("서버에서 받은 JSON 데이터:", jsonData.result);
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

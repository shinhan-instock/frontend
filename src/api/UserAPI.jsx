import axios from 'axios';
const BASE_URL = 'http://localhost:8080';
export async function login(userId, password) {
  const res = await axios.post(`${BASE_URL}/users/login`, {
    userId: userId,
    password: password,
  });
  const data = res.data.result;
  if (data && data.userId) {
    localStorage.setItem('user_id', data.userId); 
  } else {
    console.error('로그인 응답에서 user_id를 찾을 수 없습니다.');
  }
  return data;
}

export async function searchUser(userId) {
  const res = await axios.get(`${BASE_URL}/users/search?keyword=${userId}`);
  const data = res.data.result;
  return data;
}
let eventSource = null;

export async function getFollowList() {
  try {
    const userId = localStorage.getItem('user_id'); 
    if (!userId) {
      console.error('user_id가 없습니다. 로그인 후 다시 시도하세요.');
      return [];
    }

    const res = await axios.get(`${BASE_URL}/users/follow`, {
      headers: {
        Authorization: userId,
        'Content-Type': 'application/json',
      },
    });

    return res.data.data;
  } catch (error) {
    console.error('팔로우 리스트 조회 오류:', error);
    return [];
  }
}

export async function followUser(nickname) {
  try {
    const userId = localStorage.getItem('user_id'); 
    if (!userId) {
      console.error('❌ user_id가 없습니다. 로그인 후 다시 시도하세요.');
      alert("로그인이 필요합니다. 다시 로그인해주세요.");
      return;
    }

    const res = await axios.post(
      `${BASE_URL}/users/follow`,
      null, 
      {
        headers: {
          Authorization: `Bearer ${userId}`, 
          'Content-Type': 'application/json',
        },
        params: { Nickname: nickname }, 
      }
    );

    console.log("✅ 팔로우 성공:", res.data);
    return res.data;
  } catch (error) {
    console.error('❌ 팔로우 요청 오류:', error.response ? error.response.data : error.message);
    throw error;
  }
}


export function getWatchList(userId, onMessage, onError) {
  if (!userId) return () => {};

  if (eventSource) {
    eventSource.close();
    console.log("SSE 연결 종료");
  }

  eventSource = new EventSource(
    `http://localhost:8080/watchList?userId=${userId}&page=0&size=5`
  );

  eventSource.onmessage = (event) => {
    try {
      const jsonData = JSON.parse(event.data);
      console.log('서버에서 받은 JSON 데이터:', jsonData.result);
      if (onMessage) {
        onMessage(jsonData);
      }
    } catch (error) {
      console.error('JSON 파싱 오류:', error);
    }
  };

  eventSource.onerror = (error) => {
    console.error('SSE 연결 오류:', error);
    if (onError) {
      onError(error);
    }
    eventSource.close();
  };

  return () => {
    console.log('SSE 연결 종료');
    eventSource.close();
  };
}

export async function addWatchList(userId, stockCode, stockName, onUpdate) {
  const res = await axios.post("http://localhost:8080/watchList", {
    userId: userId,
    stockCode: stockCode,
    stockName: stockName,
  });

  const data = res.data.result;
  console.log("added watchList", data);

  if (onUpdate) {
    onUpdate();
  }
  return data;
}

export async function deleteWatchList(userId, stockName, onUpdate) {
  const res = await axios.delete("http://localhost:8080/watchList", {
    data: {
      userId: userId,
      stockName: stockName,
    },
  });

  const data = res.data.result;
  console.log("deleted watchList", data);

  if (onUpdate) {
    onUpdate();
  }
  return data;
}

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
  }
  return data;
}

export async function searchUser(userId) {
  const res = await axios.get(`${BASE_URL}/users/search?keyword=${userId}`);
  const data = res.data.result;
  return data;
}
let eventSource = null;

export async function getFollowList(nickname) {
  try {
    if (!nickname) {
      return [];
    }

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      return [];
    }
    const res = await axios.get(`${BASE_URL}/users/follow`, {
      headers: {
        Authorization: `Bearer ${userId}`,
        'Content-Type': 'application/json',
      },
      params: { following: nickname },
    });

    return res.data.result;
  } catch (error) {
    return [];
  }
}

export async function followUser(nickname) {
  try {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      return;
    }
    const res = await axios.post(`${BASE_URL}/users/follow`, null, {
      headers: {
        Authorization: `Bearer ${userId}`,
        'Content-Type': 'application/json',
      },
      params: { Nickname: nickname },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function unfollowUser(nickname) {
  try {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      return;
    }
    const res = await axios.delete(`${BASE_URL}/users/follow`, {
      headers: {
        Authorization: `Bearer ${userId}`,
        'Content-Type': 'application/json',
      },
      params: { Nickname: nickname }, 
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

export function getWatchList(userId, onMessage, onError) {
  if (!userId) return () => {};

  if (eventSource) {
    eventSource.close();
    console.log('SSE 연결 종료');
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
  const res = await axios.post('http://localhost:8080/watchList', {
    userId: userId,
    stockCode: stockCode,
    stockName: stockName,
  });

  const data = res.data.result;
  console.log('added watchList', data);

  if (onUpdate) {
    onUpdate();
  }
  return data;
}

export async function deleteWatchList(userId, stockName, onUpdate) {
  const res = await axios.delete('http://localhost:8080/watchList', {
    data: {
      userId: userId,
      stockName: stockName,
    },
  });

  const data = res.data.result;
  console.log('deleted watchList', data);

  if (onUpdate) {
    onUpdate();
  }
  return data;
}

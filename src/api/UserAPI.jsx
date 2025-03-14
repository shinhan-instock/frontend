/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import axios from "axios";
import { CuteAlert } from "../components/common/CuteAlert";
import { EventSourcePolyfill } from "event-source-polyfill";

const BASE_URL = "api.inst00ck.shop";

export async function checkInfluencerStatus(userNickname) {
  try {
    if (!userNickname) return false; // 닉네임이 없으면 false 반환

    const response = await axios.get(`${BASE_URL}/users/influencer`);
    if (response.data.isSuccess) {
      const influencerList = response.data.result;
      return influencerList.some((user) => user.nickname === userNickname);
    }
  } catch (error) {
    console.error("인플루언서 여부 확인 실패:", error);
  }
  return false;
}

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
let eventSource = null;

export async function getFollowList(userInfo, nickname) {
  try {
    if (!nickname || !userInfo) return [];

    const res = await axios.get(`${BASE_URL}/users/follow`, {
      headers: {
        Authorization: `Bearer ${userInfo.userId}`,
        "Content-Type": "application/json",
      },
      params: { following: nickname },
    });

    return res.data.result;
  } catch (error) {
    return [];
  }
}

export async function followUser(userInfo, nickname) {
  try {
    if (!userInfo) return;

    const res = await axios.post(`${BASE_URL}/users/follow`, null, {
      headers: {
        Authorization: `Bearer ${userInfo.userId}`,
        "Content-Type": "application/json",
      },
      params: { Nickname: nickname },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}
export async function unfollowUser(userInfo, nickname) {
  try {
    if (!userInfo) return;

    const res = await axios.delete(`${BASE_URL}/users/follow`, {
      headers: {
        Authorization: `Bearer ${userInfo.userId}`,
        "Content-Type": "application/json",
      },
      params: { Nickname: nickname },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

export function account(userInfo, onMessage, onError) {
  if (!userInfo || !userInfo.userId) {
    return () => {};
  }

  // 기존 SSE 연결이 있으면 닫기
  if (eventSource) {
    eventSource.close();
  }

  const url = `${BASE_URL}/accounts/stream`;

  async function fetchSSE() {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.userId}`, // 헤더에
          Accept: "text/event-stream",
        },
      });

      if (!response.ok) {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);

        if (!text.trim()) continue;

        try {
          // "data:" 제거 후 JSON 파싱
          const cleanText = text.replace(/^data:\s*/, "");
          const jsonData = JSON.parse(cleanText);

          if (onMessage) onMessage(jsonData);
        } catch (error) {}
      }
    } catch (error) {
      if (onError) onError(error);
    } finally {
      /* empty */
    }
  }

  // SSE 연결 시작
  fetchSSE().catch((error) => {});
  return () => {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
  };
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
      // console.log("서버에서 받은 JSON 데이터:", jsonData.result);
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

export async function addWatchList(userId, stockCode, stockName, onUpdate) {
  const res = await axios.post("http://localhost:8080/watchList", {
    userId: userId,
    stockCode: stockCode,
    stockName: stockName,
  });

  const data = res.data.result;
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
  if (onUpdate) {
    onUpdate();
  }
  return data;
}

export async function getUserInfo(userId) {
  const res = await axios.post(
    `${BASE_URL}/users`,
    {},
    {
      headers: { Authorization: `Bearer ${userId}` },
    }
  );
  const data = res.data.result;
  return data;
}

export async function updateUser(
  name,
  nickname,
  image,
  introduction,
  userId,
  previewUrl
) {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("nickname", nickname);
  if (image) {
    formData.append("image", image);
  }
  formData.append("introduction", introduction);

  try {
    const res = await axios.put(`${BASE_URL}/users`, formData, {
      headers: {
        Authorization: `Bearer ${userId}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // 기존 데이터 가져오기
    const existingUserData =
      JSON.parse(sessionStorage.getItem("instock_user")) || {};

    // 기존 userId 유지하면서 나머지 값 업데이트
    const updatedUserData = {
      ...existingUserData,
      nickname: nickname,
      imageUrl: previewUrl,
      introduction: introduction,
    };
    sessionStorage.setItem("instock_user", JSON.stringify(updatedUserData));
    CuteAlert("🎉 수정이 완료되었습니다!", "success");
  } catch (error) {
    console.error(
      "❌ 사용자 정보 업데이트 실패:",
      error.response?.data || error.message
    );

    if (
      error.response?.status === 400 &&
      error.response?.data?.message?.includes("이미 사용 중")
    ) {
      CuteAlert("😢 이미 사용 중인 닉네임입니다.", "error");
    } else {
      CuteAlert("😢 이미 사용 중인 닉네임입니다.", "error");
    }
  }
}

export function getUserAccount(userId, targetUserId, onMessage, onError) {
  if (!userId || !targetUserId) return () => {};

  // SSE 설정
  const eventSource = new EventSourcePolyfill(
    `http://localhost:8080/users/account/${targetUserId}/stream`,
    {
      method: "GET", // POST 요청 지원
      headers: {
        Authorization: `Bearer ${userId}`, // 필요 시 실제 토큰 사용
      },
      body: JSON.stringify({ userId: targetUserId }),
      withCredentials: true,
    }
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

  // 클린업 함수 반환 (SSE 연결 해제)
  return () => {
    console.log("SSE 연결 종료");
    eventSource.close();
  };
}

export async function changeOpenAccount(id) {
  const res = await axios.post(
    `${BASE_URL}/users/openAccount`,
    {},
    {
      headers: {
        Authorization: `Bearer ${id}`,
      },
    }
  );
  console.log(res.data);
  return res.data.result;
}

export async function getMyInfo(id) {
  const res = await axios.post(
    "http://localhost:8080/users",
    {},
    {
      headers: {
        Authorization: `Bearer ${id}`,
      },
    }
  );
  return res.data.result;
}

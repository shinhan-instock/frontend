/* eslint-disable no-useless-catch */

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
// export async function updatePost(postId, content, hashtag, file) {
//   try {
//     const userId = sessionStorage.getItem('user_id');
//     if (!userId) {
//       throw new Error('로그인이 필요합니다.');
//     }

//     const formData = new FormData();
//     formData.append('content', content);
//     formData.append('hashtag', hashtag);
//     if (file) {
//       formData.append('file', file);
//     }

//     const res = await axios.put(`${BASE_URL}/posts/${postId}`, formData, {
//       headers: {
//         Authorization: `Bearer ${userId}`,
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return res.data;
//   } catch (error) {
//     console.error('게시글 수정 실패:', error);
//     throw error;
//   }
// }
// export async function deletePost(postId) {
//   try {
//     const userId = sessionStorage.getItem('user_id');
//     if (!userId) {
//       throw new Error('로그인이 필요합니다.');
//     }

//     const res = await axios.delete(`${BASE_URL}/posts/${postId}`, {
//       headers: {
//         Authorization: `Bearer ${userId}`,
//       },
//     });

//     return res.data;
//   } catch (error) {
//     console.error('게시글 삭제 실패:', error);
//     throw error;
//   }
// }

export async function account(userInfo) {
  try {
    if (!userInfo) {
      throw new Error("로그인이 필요합니다.");
    }

    const res = await axios.get(`${BASE_URL}/accounts`, {
      headers: {
        Authorization: `Bearer ${userInfo.userId}`,
      },
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
    console.log("SSE 연결 종료");
  }

  eventSource = new EventSource(
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
    alert("수정이 완료되었습니다");
    window.location.reload();
  } catch (error) {
    alert(
      "다른 사용자가 닉네임을 사용하고 있습니다. 다른 닉네임으로 등록해주세요."
    );
  }
}

export async function getUserAccount(id, userId) {
  try {
    const res = await axios.post(
      `${BASE_URL}/users/account`,
      { userId: userId },
      {
        headers: {
          Authorization: `Bearer ${id}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
  }
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
  return res.data.result;
}

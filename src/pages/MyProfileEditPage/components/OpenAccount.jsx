import { useState, useEffect } from "react";
import { changeOpenAccount, getMyInfo } from "../../../api/UserAPI";
import { useLogin } from "../../../hooks/useLogin";

export default function OpenAccount() {
  const { userInfo } = useLogin();
  const [myInfo, setMyInfo] = useState(null);
  const [isOpenAccount, setIsOpenAccount] = useState(false);

  useEffect(() => {
    if (userInfo?.userId) {
      getMyInfo(userInfo.userId).then((result) => {
        console.log("user", result);
        setMyInfo(result);
        setIsOpenAccount(result.openAccount);
      });
    }
  }, [userInfo]);

  const handleToggleChange = async () => {
    try {
      await changeOpenAccount(userInfo.userId);

      const updatedUserInfo = await getMyInfo(userInfo.userId);
      setMyInfo(updatedUserInfo);
      setIsOpenAccount(updatedUserInfo.openAccount);

      sessionStorage.setItem("instock_user", JSON.stringify(updatedUserInfo));
    } catch (error) {
      console.error("계좌 공개 상태 변경 실패:", error);
    }
  };

  if (!myInfo) return <div>로딩 중...</div>;

  return (
    <div>
      {myInfo.influencer ? (
        <div>인플루언서는 계좌 공개가 필수입니다.</div>
      ) : (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isOpenAccount}
            onChange={handleToggleChange}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            보유종목 공개
          </span>
        </label>
      )}
    </div>
  );
}

import { loginContext } from "../context/loginContext";
import { useContext } from "react";

export function useLogin() {
  const { userInfo, setUserInfo } = useContext(loginContext);

  return { userInfo, setUserInfo };
}

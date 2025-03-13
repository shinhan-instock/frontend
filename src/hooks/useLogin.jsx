import { LoginContext } from "../context/LoginContext";
import { useContext } from "react";

export function useLogin() {
  const { userInfo, setUserInfo } = useContext(LoginContext);

  return { userInfo, setUserInfo };
}

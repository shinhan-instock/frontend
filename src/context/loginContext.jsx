/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const loginContext = createContext();

function instockUser() {
  const instock_user = sessionStorage.getItem("instock_user");
  return instock_user !== "" ? JSON.parse(instock_user) : null;
}
export function LoginProvider({ children }) {
  const [userInfo, setUserInfo] = useState(instockUser());

  return (
    <>
      <loginContext.Provider value={{ userInfo, setUserInfo }}>
        {children}
      </loginContext.Provider>
    </>
  );
}

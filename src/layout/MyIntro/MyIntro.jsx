/* eslint-disable react/prop-types */

import { useLogin } from "../../hooks/useLogin";
import OpenedProfile from "./components/OpenedProfile";
import ClosedProfile from "./components/ClosedProfile";

export default function MyIntro({
  setIsMyInfoOpen,
  isMyInfoOpen,
  setIsLogoutOpen,
}) {
  const { userInfo } = useLogin();

  return (
    <div className="w-full mx-auto px-5 z-10 relative">
      {isMyInfoOpen && userInfo ? (
        <OpenedProfile
          userInfo={userInfo}
          setIsMyInfoOpen={setIsMyInfoOpen}
          isMyInfoOpen={isMyInfoOpen}
          setIsLogoutOpen={setIsLogoutOpen}
        />
      ) : (
        <ClosedProfile
          userInfo={userInfo}
          setIsMyInfoOpen={setIsMyInfoOpen}
          isMyInfoOpen={isMyInfoOpen}
        />
      )}
    </div>
  );
}

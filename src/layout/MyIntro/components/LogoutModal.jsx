/* eslint-disable react/prop-types */
import Modal from "../../../components/common/Modal";
import crypig from "/img/crypig.png";

export default function LogoutModal({ isLogoutOpen, setIsLogoutOpen }) {
  const handleLogout = () => {
    sessionStorage.removeItem("instock_user");

    setIsLogoutOpen(false);
    location.reload();
  };
  return (
    <Modal
      isOpen={isLogoutOpen}
      onClose={() => {
        setIsLogoutOpen(false);
      }}
    >
      <div className="flex flex-col items-center justify-center h-4/5 gap-10">
        <img src={crypig} className="w-1/3 h-1/3 " />
        <div className="text-2xl">정말 로그아웃 하시겠습니까?</div>
        <button
          className="bg-black text-white rounded-4xl py-2 px-16 "
          onClick={handleLogout}
        >
          네
        </button>
      </div>
    </Modal>
  );
}

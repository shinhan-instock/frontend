import { useState } from "react";
import EditForm from "./components/EditForm";
import Modal from "../../components/common/Modal";
import crypig from "/img/crypig.png";

export default function MyProfileEditPage() {
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div className="flex flex-col items-center w-full gap-5">
        <EditForm />
        <button
          className="bg-instock-gray text-center  text-red-500 rounded-2xl w-1/4 p-2"
          onClick={handleDelete}
        >
          계정 삭제
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col items-center justify-center h-4/5 gap-10">
          <img src={crypig} className="w-1/3 h-1/3 " />
          <div className="text-2xl">정말 계정을 삭제 하시겠습니까?</div>
          <button className="bg-black text-white rounded-4xl py-2 px-16 ">
            네
          </button>
        </div>
      </Modal>
    </>
  );
}

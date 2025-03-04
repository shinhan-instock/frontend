import { useState } from "react";
import EditForm from "./components/EditForm";
import Modal from "../../components/common/Modal";

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
        asdfasdfasdf
      </Modal>
    </>
  );
}

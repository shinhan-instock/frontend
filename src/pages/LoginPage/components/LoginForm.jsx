import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/UserAPI";
import Modal from "../../../components/common/Modal";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errMsg, setErrMsg] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(id, pw)
      .then((result) => {
        sessionStorage.setItem("instock_user", JSON.stringify(result));
        navigate("/");
        location.reload();
      })

      .catch((err) => {
        setIsOpen(true);

        setErrMsg(err.response.data.message);
      });
  };
  return (
    <div className="flex flex-col gap-5 px-60">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>ID</div>
        <input
          onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="Enter your Id"
          className="border-1 border-stroke-gray p-2 rounded-md"
        />

        <div>Password</div>
        <input
          onChange={(e) => {
            setPw(e.target.value);
          }}
          placeholder="Enter your password"
          className="border-1 border-stroke-gray p-2 rounded-md"
        />

        <button
          onClick={() => setIsOpen(true)}
          type="submit"
          className="border-1 border-stroke-gray p-2 rounded-md bg-black text-white"
        >
          Login
        </button>
      </form>
      {errMsg && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {errMsg}
        </Modal>
      )}
    </div>
  );
}

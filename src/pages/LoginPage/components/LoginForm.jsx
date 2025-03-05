import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    // 로그인 api 호출해서 로그인 성공하면 -> 로컬스토리지에 넣기
    sessionStorage.setItem("instock_user", JSON.stringify({ id: id }));
    navigate("/");
  };
  return (
    <div className="flex flex-col gap-5 px-60">
      <form className="flex flex-col gap-5">
        <div>ID</div>
        <input
          onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="Enter your Id"
          className="border-1 border-stroke-gray p-2 rounded-md"
        ></input>

        <div>Password</div>
        <input
          onChange={(e) => {
            setPw(e.target.value);
          }}
          placeholder="Enter your password"
          className="border-1 border-stroke-gray p-2 rounded-md"
        ></input>

        <button
          onClick={handleSubmit}
          type="submit"
          className="border-1 border-stroke-gray p-2 rounded-md bg-black text-white "
        >
          Login
        </button>
      </form>
    </div>
  );
}

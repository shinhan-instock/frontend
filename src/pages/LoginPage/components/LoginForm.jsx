import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const handleSubmit = async () => {
    console.log(id, pw);
    try {
      const res = await axios.post("localhost:8080/user/login", { id, pw });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
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
          className="border-1 border-zinc-300 p-2 rounded-md"
        ></input>

        <div>Password</div>
        <input
          onChange={(e) => {
            setPw(e.target.value);
          }}
          placeholder="Enter your password"
          className="border-1 border-zinc-300 p-2 rounded-md"
        ></input>

        <button
          onClick={handleSubmit}
          type="submit"
          className="border-1 border-zinc-300 p-2 rounded-md bg-black text-white "
        >
          Login
        </button>
      </form>
    </div>
  );
}

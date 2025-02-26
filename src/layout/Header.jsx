import logo from "/img/instock.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <img
      src={logo}
      className="w-2/3 mt-5 mx-5"
      onClick={() => {
        navigate("/");
      }}
    />
  );
}

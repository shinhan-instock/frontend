import logo from "/img/instock.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <img
      src={logo}
      className="w-1/2"
      onClick={() => {
        navigate("/");
      }}
    />
  );
}

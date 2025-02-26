import pigImg from "/img/piggybank.png";
import { useNavigate } from "react-router-dom";

export default function Pig() {
  const navigate = useNavigate();
  return (
    <div>
      <img
        src={pigImg}
        className="w-1/2"
        onClick={() => {
          navigate("/piggybank");
        }}
      />
      <div></div>
    </div>
  );
}

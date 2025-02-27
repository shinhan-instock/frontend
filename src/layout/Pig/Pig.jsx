import pigImg from "/img/piggyImg.jpg";
import CardSlider from "./components/CardSlider";
import { useNavigate } from "react-router-dom";

export default function Pig() {
  const navigate = useNavigate();
  return (
    <div className="h-1/5 w-full px-5">
      <CardSlider />
      {/* <img
        className="px-5"
        src={pigImg}
        onClick={() => {
          navigate("/piggybank");
        }}
      />
      <div></div> */}
    </div>
  );
}

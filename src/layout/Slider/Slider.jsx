/* eslint-disable react/prop-types */
import CardSlider from "./components/CardSlider";

export default function Slider({ isMyInfoOpen }) {
  return (
    !isMyInfoOpen && (
      <div className="h-1/5 w-full px-5 z-0">
        <CardSlider />
      </div>
    )
  );
}

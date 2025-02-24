import Piggybank from "./components/Piggybank";
import CurrentMileage from "./components/CurrentMileage";

export default function PiggybankPage() {
  return (
    <div className="flex flex-col items-center gap-20 overflow-hidden">
      <CurrentMileage />
      <Piggybank />
    </div>
  );
}

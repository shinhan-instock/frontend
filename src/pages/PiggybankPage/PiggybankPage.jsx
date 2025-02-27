import Piggybank from "./components/Piggybank";
import CurrentMileage from "./components/CurrentMileage";
import PiggyBankCoin from "./components/PiggyBankCoin";

export default function PiggybankPage() {
  return (
    <div className="flex flex-col items-center gap-20 overflow-hidden my-5">
      <CurrentMileage />
      <Piggybank />
    </div>
  );
}

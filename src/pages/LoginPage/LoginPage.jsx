import logo from "/img/instock.png";

import LoginForm from "./components/LoginForm";
export default function LoginPage() {
  return (
    <div className="flex flex-row items-center h-screen pb-10">
      <div className="flex flex-col w-1/3 pl-28">
        <img src={logo} className="w-2/3 " />
        <div className="text-5xl font-bold">Login to Instock</div>
      </div>
      <div className="w-2/3">
        <LoginForm />
      </div>
    </div>
  );
}

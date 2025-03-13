import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers/Router";
import { LoginProvider } from "./context/LoginContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <LoginProvider>
      <RouterProvider router={router}></RouterProvider>

      <ToastContainer
        position="top-center"
        autoClose={false} // ⬅ 자동 닫힘 비활성화 (버튼을 눌러야 닫힘)
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false} // ⬅ 클릭하면 닫히는 것 방지
        pauseOnFocusLoss
        draggable={false} // ⬅ 드래그 방지
        pauseOnHover
        theme="colored"
      />
    </LoginProvider>
  );
}

export default App;

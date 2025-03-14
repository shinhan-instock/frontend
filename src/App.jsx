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
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
    </LoginProvider>
  );
}

export default App;

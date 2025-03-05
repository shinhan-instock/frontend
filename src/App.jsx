import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers/Router";
import { LoginProvider } from "./context/loginContext";

function App() {
  return (
    <LoginProvider>
      <RouterProvider router={router}></RouterProvider>
    </LoginProvider>
  );
}

export default App;

import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers/Router";
import { LoginProvider } from "./context/loginContext";
import { WatchListProvider } from "./context/WatchListContext";

function App() {
  return (
    <LoginProvider>
      <WatchListProvider>
        <RouterProvider router={router}></RouterProvider>
      </WatchListProvider>
    </LoginProvider>
  );
}

export default App;

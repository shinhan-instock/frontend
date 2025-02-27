import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import MyProfileEditPage from "../pages/MyProfileEditPage/MyProfileEditPage";
import MyProfilePage from "../pages/MyProfilePage/MyProfilePage";
import PiggybankPage from "../pages/PiggybankPage/PiggybankPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignupPage from "../pages/SignupPage/SignupPage";
import StockPage from "../pages/StockPage/StockPage";

export const Routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { element: <MainPage />, index: true },
      { element: <MyProfileEditPage />, path: "/myprofile/edit" },
      { element: <MyProfilePage />, path: "/myprofile" },
      { element: <PiggybankPage />, path: "/piggybank" },
      { element: <ProfilePage />, path: "/profile" },
      { element: <StockPage />, path: "/stock/:id" },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
];

const router = createBrowserRouter(Routes);

export default router;

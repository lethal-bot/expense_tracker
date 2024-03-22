import "./App.css";
import RootLayout from "./components/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Track from "./pages/Track";
import Login from "./pages/Login";
import Otp from "./components/Otp";
import Delete from "./components/Delete";
import ForgetPassword from "./components/ForgetPassword";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/register", element: <Registration /> },
        { path: "/track", element: <Track /> },
        { path: "/login", element: <Login /> },
        { path: "/login/otp", element: <Otp /> },
        { path: "/login/forget", element: <ForgetPassword /> },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/profile/delete",
          element: <Delete />,
        },
        {
          path: "/profile/update",
          element: <UpdateProfile />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

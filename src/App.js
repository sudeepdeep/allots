import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import UploadPost from "./pages/UploadPost";
import PublicArticle from "./pages/PublicArticle";
import Success from "./pages/auth/Success";
import Logout from "./pages/auth/Logout";
import UserProfile from "./pages/UserProfile";
import Comment from "./pages/Comment";
import Error from "./pages/Error";
import Messages from "./pages/messages/Messages";
import AllMessages from "./pages/messages/AllMessages";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/add",
        element: <UploadPost />,
      },

      {
        path: "/local-news",
        element: <Bookings />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/user-profile/:username",
        element: <UserProfile />,
      },
      {
        path: "/comments/:articleId",
        element: <Comment />,
      },
      {
        path: "/messages",
        element: <AllMessages />,
      },
      {
        path: "/messages/:msgId",
        element: <AllMessages />,
      },
      {
        path: "/*",
        element: <Error />,
      },
    ],
  },
  {
    path: "/public-article/:id",
    element: <PublicArticle />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

function App() {
  return (
    <div className="font-poppins">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;

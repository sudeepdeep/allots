import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

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
        element: <Home />,
      },

      {
        path: "/public-feed",
        element: <Home />,
      },

      {
        path: "/full-profile",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
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

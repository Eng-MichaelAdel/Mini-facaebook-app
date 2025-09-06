import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./Layouts/AuthLayout";
import MainLayout from "./Layouts/MainLayout";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import FeedPage from "./Pages/FeedPage";
import PostDetailsPage from "./Pages/PostDetailsPage";
import ProfilePage from "./Pages/ProfilePage";
import NotFoundPage from "./Pages/NotFoundPage";
import ProtectedRoutes from "./ProtectedRotes/ProtectedRoutes";
import ProtectedAuthRoutes from "./ProtectedRotes/ProtectedAuthRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools/src/index";

export const queryclient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {path: "login",element: (<ProtectedAuthRoutes><LoginPage /></ProtectedAuthRoutes>)},
      { path: "register",element: (<ProtectedAuthRoutes><RegisterPage /></ProtectedAuthRoutes>)},
    ],
  },
  {path: "",element: <MainLayout />,children: [
      {index: true,element: (<ProtectedRoutes><FeedPage /></ProtectedRoutes>)},
      {path: "post-details/:id",element: (<ProtectedRoutes><PostDetailsPage /></ProtectedRoutes>)},
      {path: "profile",element: (<ProtectedRoutes><ProfilePage /></ProtectedRoutes>)},
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryclient}>
        <ReactQueryDevtools />
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </>
  );
}

export default App;

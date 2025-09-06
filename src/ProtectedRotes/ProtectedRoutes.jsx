import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext";
import LoginPage from "../Pages/LoginPage/LoginPage";


export default function ProtectedRoutes({ children }) {
  const { isLoggedIn } = useContext(authContext);
  return isLoggedIn ? children : <Navigate to="/login"  />;
}

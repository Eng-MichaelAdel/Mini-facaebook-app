import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext";
import LoginPage from './../Pages/LoginPage/LoginPage';


export default function ProtectedAuthRoutes({ children }) {
  const { isLoggedIn} = useContext(authContext);
  return isLoggedIn ? <LoginPage /> : children;
}

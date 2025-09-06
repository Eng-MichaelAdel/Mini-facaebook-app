import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <div className="h-screen bg-gradient-to-tr from-primary-400 to-pink-400 overflow-auto">
          <Outlet/>
      </div>
    </>
  );
}

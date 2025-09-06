import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import SwitchingPagesProvider from "../Contexts/SwitchingPages";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className='container px-3'>
        <SwitchingPagesProvider>
          <Outlet />
        </SwitchingPagesProvider>
      </div>
    </div>
  );
}

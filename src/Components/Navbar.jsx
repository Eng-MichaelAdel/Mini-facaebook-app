import React, { useContext } from "react";
import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext";

export default function Navbar() {
  const Navigate = useNavigate();
  const { isLoggedIn, setisLoggedIn } = useContext(authContext);

  function handleLogout() {
    localStorage.removeItem("token");
    setisLoggedIn(false);
    Navigate("/login");
  }

  return (
    <HeroNavbar className='bg-blue-100 shadow '>
      <NavbarBrand className='flex justify-between'>
        <Link to={"/"} className='font-bold text-inherit text-2xl text-shadow-md '>
          Facebook
        </Link>
        {/* <Link to={"profile"} className='font-bold text-inherit text-lg text-shadow-md '>
          Profile
        </Link> */}
      </NavbarBrand>
      <NavbarContent justify='end'>
        {isLoggedIn ? (
          <NavbarItem>
            <Button className='text-shadow-md' onPress={handleLogout} color='danger' variant='flat'>
              Log out
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className='flex'>
              <Button className='text-shadow-md' color='default'>
                <Link to={"/login"}>Login</Link>
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button className='text-shadow-md' color='primary' variant='flat'>
                <Link to={"/register"}>Sign Up</Link>
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </HeroNavbar>
  );
}

import { useEffect, useState } from "react";
import { createContext } from "react";
import { handleGetUserDataAPI } from "../Services/authService";


export const authContext = createContext();

export function AuthContextProvider({ children }) {
  const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem("token") != null);
  const [userData, setuserData] = useState(null);

  async function getUserData() {
    const response = await handleGetUserDataAPI();
    if (response.message == "success") {
      setuserData(response.user);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    } else {
      setuserData(null);
    }
  }, [isLoggedIn]);

  return <authContext.Provider value={{ isLoggedIn, setisLoggedIn, userData, setuserData }}>{children}</authContext.Provider>;
}

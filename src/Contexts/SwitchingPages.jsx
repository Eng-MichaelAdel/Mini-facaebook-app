import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const SwitchingPages = createContext();

export default function SwitchingPagesProvider({ children }) {
  const location = useLocation();
  const [isFeedPage, setisFeedPage] = useState(location.pathname == "/");
  const [isPostDetailsPage, setisPostDetailsPage] = useState(false);

  useEffect(() => {
    setisFeedPage(location.pathname == "/");
    setisPostDetailsPage(location.pathname.startsWith("/post-details/"))
  }, [location.pathname]);

  return <SwitchingPages.Provider value={{ isFeedPage, setisFeedPage, isPostDetailsPage, setisPostDetailsPage }}>{children}</SwitchingPages.Provider>;
}

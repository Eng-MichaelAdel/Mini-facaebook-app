import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { AuthContextProvider } from "./Contexts/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider />
    <ToastProvider />
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    <HeroUIProvider />
  </StrictMode>
);

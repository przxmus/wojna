import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Unsupported from "./Unsupported.tsx";

const Root = () => {
  const [isSupported, setIsSupported] = useState(
    window.matchMedia("(min-width: 750px)").matches,
  );

  useEffect(() => {

    window.addEventListener("resize", () => {
      setIsSupported(window.matchMedia("(min-width: 750px)").matches);
    });
  }, []);

  return <StrictMode>{isSupported ? <App /> : <Unsupported />}</StrictMode>;
};

createRoot(document.getElementById("root")!).render(<Root />);

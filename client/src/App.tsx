import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/global.css";
import { useState } from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const [isLoggedIn] = useState(true);
  const [isInstalled] = useState(() => {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        (navigator as { standalone?: boolean }).standalone === true)
    );
  });

  if (!isInstalled) return <Home />;

  if (!isLoggedIn) return <Login />;

  return <Main />;
}

export default App;

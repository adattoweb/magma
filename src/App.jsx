import { useState, useEffect } from "react";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import About from "./pages/About/About";
import Main from "./pages/Main/Main";
import Settings from "./pages/Settings/Settings";
import LoadScreen from "./components/LoadScreen/LoadScreen";
import Trackers from "./pages/Trackers/Trackers";
import Analytics from "./pages/Analytics/Analytics";
import Page404 from "./pages/Page404/Page404";
import Tier from "./pages/Tier/Tier";
import Goals from "./pages/Goals/Goals";
import Calendar from "./pages/Calendar/Calendar";
import Note from "./pages/Notebook/Note"

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  if(!localStorage.getItem("magma-clock")) localStorage.setItem("magma-clock", "24")
  if(!localStorage.getItem("magma-quotes")) localStorage.setItem("magma-quotes", "true")
  if(!localStorage.getItem("magma-darkness")) localStorage.setItem("magma-darkness", "20")

  let location = useLocation()
  let currentPath = location.pathname;

  const choosedBackground = localStorage.getItem("settings-bg")
  const customizeBackground = localStorage.getItem("settings-customize-theme")
  if(choosedBackground === null) localStorage.setItem("settings-bg", "0");
  if(!localStorage.getItem("settings-lang")) localStorage.setItem("settings-lang", "ua");
  if(!localStorage.getItem("settings-theme")) localStorage.setItem("settings-theme", "light");
  if(!localStorage.getItem("magma-name")) localStorage.setItem("magma-name", "user");
  if(customizeBackground === null) localStorage.setItem("settings-customize-theme", "not choosed");
  const root = document.getElementById("root")
  root.style.setProperty(`--darkness`, `rgba(0,0,0,${+localStorage.getItem("magma-darkness") / 100})`)
  useEffect(() => {
    if(choosedBackground !== "100") root.classList.add(`theme${choosedBackground}`)
      else {
        root.style.backgroundImage = `url("${localStorage.getItem("settings-customize-theme")}")`;
      }
  }, [])
  console.log(currentPath)
  if(currentPath.includes("about")) root.classList.add(`theme0`)

  console.log("App render");

  const [isRender, setIsRender] = useState(false);

  const now = new Date()
  const activeTheme = localStorage.getItem("settings-theme")
  let wrapper = document.querySelector(".wrapper"); // короч якщо в localStorage тема обрана чорною, то даємо клас dark, інакше прибираємо
  activeTheme === "dark" || (activeTheme === "auto" && now.getHours() >= 18) ? wrapper.classList.add("dark") : wrapper.classList.remove("dark");

  const [isLoading, setIsLoading] = useState(true);
  const [isMenu, setIsMenu] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => { setIsLoading(false); }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadScreen></LoadScreen>;

  if (isMenu) return <Menu isMenu={isMenu} onClick={() => setIsMenu(false)} />;
  else {
    return (
      <>
        <Menu isMenu={isMenu} onClick={() => setIsMenu(false)} />
        <Header onClick={() => setIsMenu(true)} />
        <Routes>
        <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/trackers" element={<Trackers />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings onChange={() => setIsRender(!isRender)}/>} />
          <Route path="/tierlist" element={<Tier />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/notebook" element={<Note />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </>
    );
  }
}

export default App;

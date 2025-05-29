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

export default function App() {
  let array = [["magma-clock", "24"], ["magma-quotes", "true"], ["magma-darkness", "20"], ["settings-lang", "ua"], ["settings-theme", "light"], 
  ["magma-name", "user"], ["settings-bg", "0"], ["settings-customize-theme", "not choosed"], ["tracker-time", "0"], ["tracker-name", ""]]

  for(let i = 0; i < array.length; i++){
    if(!localStorage.getItem(array[i][0])) localStorage.setItem(array[i][0], array[i][1])
  }

  let location = useLocation()

  const choosedBackground = localStorage.getItem("settings-bg")
  const root = document.getElementById("root")
  root.style.setProperty(`--darkness`, `rgba(0,0,0,${+localStorage.getItem("magma-darkness") / 100})`)
  useEffect(() => {
    if(choosedBackground !== "100") root.classList.add(`theme${choosedBackground}`) // 100 - своя тем
      else {
        root.style.backgroundImage = `url("${localStorage.getItem("settings-customize-theme")}")`;
      }
  }, [])
  if(location.pathname.includes("about")) root.classList.add(`theme0`)

  console.log("App render");

  const [isRender, setIsRender] = useState(false);

  const now = new Date()
  const activeTheme = localStorage.getItem("settings-theme")
  let wrapper = document.querySelector(".wrapper");
  activeTheme === "dark" || (activeTheme === "auto" && (now.getHours() >= 20 || now.getHours <= 6)) ? wrapper.classList.add("dark") : wrapper.classList.remove("dark");

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

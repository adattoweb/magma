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

import { Routes, Route } from "react-router-dom";

function App() {

  const choosedBackground = localStorage.getItem("settings-bg")
  const customizeBackground = localStorage.getItem("settings-customize-theme")
  if(choosedBackground === null) localStorage.setItem("settings-bg", "0");
  if(localStorage.getItem("settings-lang") === null) localStorage.setItem("settings-lang", "ua");
  if(localStorage.getItem("settings-theme") === null) localStorage.setItem("settings-theme", "light");
  if(localStorage.getItem("magma-name") === null) localStorage.setItem("magma-name", "user");
  if(customizeBackground === null) localStorage.setItem("settings-customize-theme", "not choosed");
  useEffect(() => {
    if(choosedBackground !== "100") document.getElementById("root").classList.add(`theme${choosedBackground}`)
      else {
        document.getElementById("root").style.backgroundImage = `url("${localStorage.getItem("settings-customize-theme")}")`;
      }
  }, [])

  console.log("App render");

  const [isRender, setIsRender] = useState(false);

  let wrapper = document.querySelector(".wrapper"); // короч якщо в localStorage тема обрана чорною, то даємо клас dark, інакше прибираємо
  localStorage.getItem("settings-theme") === "dark" ? wrapper.classList.add("dark") : wrapper.classList.remove("dark");

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
          <Route path="/goalslist" element={<Goals />} />
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

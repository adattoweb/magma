import { useState, useEffect } from "react";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Main from "@/pages/Main/Main";
import Settings from "@/pages/Settings/Settings";
import LoadScreen from "@/components/LoadScreen/LoadScreen";
import Trackers from "@/pages/Trackers/Trackers";
import Analytics from "@/pages/Analytics/Analytics";
import Page404 from "@/pages/Page404/Page404";
import Goals from "@/pages/Goals/Goals";
import Calendar from "@/pages/Calendar/Calendar";

import { Routes, Route, useLocation } from "react-router-dom";

export default function App() {
  console.log(navigator.language)
  const startLang = navigator.language === "uk" ? "ua" : "en"
  let array = [["magma-clock", "24"], ["magma-quotes", "true"], ["magma-darkness", "20"], ["settings-lang", startLang], ["settings-theme", "light"], 
  ["magma-name", "user"], ["settings-bg", "0"], ["settings-customize-theme", "not choosed"], ["tracker-time", "0"], ["tracker-name", ""]]

  if(localStorage.getItem("custom-choosed") === null) localStorage.setItem("custom-choosed", "not choosed")
  const customChoosed = localStorage.getItem("custom-choosed")

  for(let i = 0; i < array.length; i++){
    if(!localStorage.getItem(array[i][0])) localStorage.setItem(array[i][0], array[i][1])
  }

  let location = useLocation()

  const choosedBackground = localStorage.getItem("settings-bg")
  const root = document.getElementById("root")
  root.style.setProperty(`--darkness`, `rgba(0,0,0,${+localStorage.getItem("magma-darkness") / 100})`)
  useEffect(() => {
    if(customChoosed.toLowerCase() === "not choosed") root.classList.add(`theme${choosedBackground}`) // 100 - своя тем
    else if(customChoosed.toLowerCase() !== "not choosed"){
      console.log("+")
      let array = localStorage.getItem("custom-themes").split("^").map(el => el.split("@"))
      let link = ""
      for(let i = 0; i < array.length; i++){
        if(array[i][0] === customChoosed) link = array[i][1]
      }
      root.style.backgroundImage = `url(${link})`;
      console.log(link)
    }
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
  activeTheme === "dark" || (activeTheme === "auto" && (now.getHours() >= 20 || now.getHours() <= 6)) ? wrapper.classList.add("dark") : wrapper.classList.remove("dark");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => { setIsLoading(false); }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadScreen></LoadScreen>;

  else {
    return (
      <>
        <Header/>
        <Routes>
        <Route path="/" element={<Main />} />
          <Route path="/trackers" element={<Trackers />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings onChange={() => setIsRender(!isRender)}/>} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </>
    );
  }
}

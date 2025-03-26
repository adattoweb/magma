import { useState, useEffect} from "react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Menu from "./Menu/Menu";
import Main from "./Main/Main";
import Settings from "./Settings/Settings";
import LoadScreen from "./LoadScreen/LoadScreen";
import Trackers from "./Trackers/Trackers";
import Projects from "./Projects/Projects";
import Analytics from "./Analytics/Analytics";
import Page404 from "./Page404/Page404";
import Tier from "./Tier/Tier";
import Goals from "./Goals/Goals";
import Calendar from "./Calendar/Calendar";

import { Routes, Route } from "react-router-dom";

function App() {

  if(localStorage.getItem("settings-lang") === null) localStorage.setItem("settings-lang", "ua");
  if(localStorage.getItem("settings-theme") === null) localStorage.setItem("settings-theme", "light");

  console.log("App render");
  // const isFirstTime = useRef(0)

  const [isRender, setIsRender] = useState(false);

  // useEffect(() => {
  //   isFirstTime.current++;
  //   if(isFirstTime.current === 2){
  //     console.log("Змінюю розмір")
  //     document.querySelectorAll("*").forEach(el => {
  //       const style = window.getComputedStyle(el);
  //       const value = style.getPropertyValue('font-size');
  //       const fontSize = parseFloat(value) || 16; // Переконуємось, що число коректне
    
  //       el.style.fontSize = fontSize + +localStorage.getItem("settings-size") + 'px';
  //     });
  //     isFirstTime.current++;
  //   }
  // })

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
          <Route path="/trackers" element={<Trackers />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings onChange={() => setIsRender(!isRender)}/>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tierlist" element={<Tier />} />
          <Route path="/goalslist" element={<Goals />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </>
    );
  }
}

export default App;

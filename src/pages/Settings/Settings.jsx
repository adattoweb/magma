import "./Settings.css"
import general from "@/assets/home.png"
import themeIcon from "@/assets/themeIcon.png"
import info from "@/assets/info.png"
import data from "@/assets/data.png"

import SettingsBlock from "./components/SettingsBlock"
import Burger from "@/components/Burger/Burger"
import Main from "./components/Main"
import Carousel from "./components/Carousel"
import InfoProvider from "./components/InfoProvider"
import Info from "./components/Info"
import Data from "./components/Data"

import { useState } from 'react'


export default function Settings({ onChange }) {

    const isEn = localStorage.getItem("settings-lang") === "en";

    const [choosed, setChoosed] = useState(+localStorage.getItem("settings-bg"))
    function TabItem({ isActive, setActive, children }) {
        return (
            <div className={isActive ? "tab__item active" : "tab__item"} onClick={setActive}>{children}</div>
        )
    }
    const [tabSelect, setTabSelect] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    function Tab() {
        return (
            <>
                <div className="tab__burger newblock">
                    <Burger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
                </div>
                <div className={isOpen ? "tab active newblock" : "tab newblock"}>
                    <div className={isOpen ? "tab__list active" : "tab__list"}>
                        <TabItem isActive={0 === tabSelect} setActive={() => { setTabSelect(0) }}><img src={general} alt="general settings icon" /> {isEn ? "General" : "Загальне"}</TabItem>
                        <TabItem isActive={1 === tabSelect} setActive={() => { setTabSelect(1) }}><img src={themeIcon} alt="customize settings icon" /> {isEn ? "Customize" : "Кастомізація"}</TabItem>
                        <TabItem isActive={2 === tabSelect} setActive={() => { setTabSelect(2) }}><img src={info} alt="info settings icon" /> {isEn ? "Info" : "Інформація"}</TabItem>
                        <TabItem isActive={3 === tabSelect} setActive={() => { setTabSelect(3) }}><img src={data} alt="data settings icon" /> {isEn ? "Data" : "Дані"}</TabItem>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="settings content">
            <div className="settings__main newblock">
                <Tab />
                <div>
                    {tabSelect === 0 && <Main onChange={onChange}/>}
                    {tabSelect === 1 && <SettingsBlock header={isEn ? "Background image" : "Фонове зображення"}>
                        <Carousel choosed={choosed} setChoosed={setChoosed} />
                    </SettingsBlock>}
                    {tabSelect === 2 && <>
                        <InfoProvider>
                            <Info/>
                        </InfoProvider>
                    </>}
                    {tabSelect === 3 && <>
                        <SettingsBlock header={isEn ? "Data management" : "Керування даними"}>
                            <Data onChange={onChange}/>
                        </SettingsBlock>
                    </>}
                </div>
            </div>
        </div>
    );
}

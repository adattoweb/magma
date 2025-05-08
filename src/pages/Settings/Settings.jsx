import "./Settings.css";
import white from "../../assets/white.png";
import black from "../../assets/black.png";
import bgDefault from "../../assets/smalltheme0.jpg"
import theme1 from "../../assets/smalltheme1.jpg"
import theme2 from "../../assets/smalltheme2.jpg"
import theme3 from "../../assets/smalltheme3.jpg"
import theme4 from "../../assets/smalltheme4.jpg"
import theme5 from "../../assets/smalltheme5.jpg"
import theme6 from "../../assets/smalltheme6.jpg"
import theme7 from "../../assets/smalltheme7.jpg"
import theme8 from "../../assets/smalltheme8.jpg"
import theme9 from "../../assets/smalltheme9.jpg"
import theme10 from "../../assets/smalltheme10.jpg"
import theme11 from "../../assets/smalltheme11.jpg"
import theme12 from "../../assets/smalltheme12.jpg"
import theme13 from "../../assets/smalltheme13.jpg"
import theme14 from "../../assets/smalltheme14.jpg"
import theme15 from "../../assets/smalltheme15.jpg"
import theme16 from "../../assets/smalltheme16.jpg"
import theme17 from "../../assets/smalltheme17.jpg"

import { Link } from "react-router-dom";
import { useState } from 'react'
import isValidUrl from './helpers/isValidUrl'


export default function Settings({onChange}) {

    const isEn = localStorage.getItem("settings-lang") === "en";

    const [choosed, setChoosed] = useState(+localStorage.getItem("settings-bg"))

    function addTheme(id){
        setChoosed(id)
        localStorage.setItem("settings-bg", id)
        const root = document.getElementById("root")
        root.classList.forEach(el => {
            if(el !== "wrapper" && el !== "dark" && el !== "light") root.classList.remove(el)
        })
        root.classList.add(`theme${id}`)
    }

    function BackItem({image, name, id}){
        return (
            <div className={choosed === id ? "backitem newblock choosed" : "backitem newblock"} onClick={() => {
                addTheme(id)
            }}>
                <img src={image} />
                <div className="backitem__footer">
                    <p>{name}</p>
                </div>
            </div>
        )
    }

    function SettingsBlock({children, header}){

        return (
            <div className="settings__block">
                <h2>
                    {header} 
                    </h2>
                {children}
            </div>
        )
    }

    function addItem(value){
        if(!isValidUrl(value)) return
        localStorage.setItem("settings-customize-theme", value)
    }
    function CustomizeTheme(){
        const id = 100;
        const getLink = localStorage.getItem("settings-customize-theme");
        const [link, setLink] = useState(getLink === "not choosed" ? "" : getLink)
        return (
            <div className={choosed !== id ? "newblock customize" : "newblock customize choosed"} onClick={() => {
                addTheme(id)
            }}>
                <img src={isValidUrl(link) ? link : ""} alt="" />
                <div className="customize__field">
                    <h4>{isEn ? "Choose your background image" : "Обрати своє фонове зображення"}</h4>
                    <p className="helpbtn"><Link to="/help">{isEn ? "Help" : "Допомога"}</Link></p>
                    <input className="newblock" type="text" value={link} onChange={(e) => {
                        setLink(e.target.value)
                        addItem(e.target.value)
                    }}/>
                </div>
            </div>
        )
    }
    function EditNick(){
        const [nick, setNick] = useState(localStorage.getItem("magma-name"))
        return (
            <input className="editnick newblock" type="text" placeholder="adattoweb123" value={nick} onChange={(e) => {
                if(e.target.value.length < 20){
                    setNick(e.target.value)
                    localStorage.setItem("magma-name", e.target.value)
                }
            }}/>
        )
    }

    return (
        <div className="settings content">
            <div className="settings__main newblock">
                <SettingsBlock header={isEn ? "Main Settings" : "Основні налаштування"}>
                    <div className="settings__lang">
                        <p className="settings__name">{isEn ? "Language:" : "Мова:"}</p>
                        <div className="settings__select">
                            <p className="lang__select" onClick={() => {
                                localStorage.setItem("settings-lang", "en");
                                onChange();
                            }}>EN</p>
                            <p className="lang__select" onClick={() => {
                                localStorage.setItem("settings-lang", "ua");
                                onChange();
                            }}>UA</p>
                        </div>
                    </div>
                    <div className="settings__theme settings__lang">
                        <p className="settings__name">{isEn ? "Theme:" : "Тема:"}</p>
                        <div className="settings__select">
                            <img src={white} onClick={() => {
                                localStorage.setItem("settings-theme", "light");
                                onChange();
                            }}/>
                            <img src={black} onClick={() => {
                                localStorage.setItem("settings-theme", "dark");
                                onChange();
                            }}/>
                        </div>
                    </div>
                </SettingsBlock>
                <SettingsBlock header={isEn ? "Edit nickname" : "Змінити нік"}>
                    <EditNick/>
                </SettingsBlock>
                <SettingsBlock header={isEn ? "Background image" : "Фонове зображення"}>
                    <div className="settings__carousel">
                        <BackItem image={bgDefault} name="Theme 0" id={0}/>
                        <BackItem image={theme1} name="Theme 1" id={1}/>
                        <BackItem image={theme2} name="Theme 2" id={2}/>
                        <BackItem image={theme3} name="Theme 3" id={3}/>
                        <BackItem image={theme4} name="Theme 4" id={4}/>
                        <BackItem image={theme5} name="Theme 5" id={5}/>
                        <BackItem image={theme6} name="Theme 6" id={6}/>
                        <BackItem image={theme7} name="Theme 7" id={7}/>
                        <BackItem image={theme8} name="Theme 8" id={8}/>
                        <BackItem image={theme9} name="Theme 9" id={9}/>
                        <BackItem image={theme10} name="Theme 10" id={10}/>
                        <BackItem image={theme11} name="Theme 11" id={11}/>
                        <BackItem image={theme12} name="Theme 12" id={12}/>
                        <BackItem image={theme13} name="Theme 13" id={13}/>
                        <BackItem image={theme14} name="Theme 14" id={14}/>
                        <BackItem image={theme15} name="Theme 15" id={15}/>
                        <BackItem image={theme16} name="Theme 16" id={16}/>
                        <BackItem image={theme17} name="Theme 17" id={17}/>
                        <CustomizeTheme/>
                    </div>
                </SettingsBlock>
                <div className="settings__block">
                </div>
                <SettingsBlock header={isEn ? "Version" : "Версія"}>
                    <p className="settings__name">{isEn ? "Current version: Magma Local 0.4.0" : "Поточна версія: Magma Local 0.4.0"}</p>
                    <p className="settings__name">{isEn ? "Read the latest changes here:" : "Прочитати останні зміни можна:"} <a href="#">adattoweb.xyz</a></p>
                </SettingsBlock>
                <SettingsBlock header={isEn ? "Developer Contacts" : "Контакти розробника"}>
                    <p className="settings__name">{isEn ? "Discord: @adattoweb" : "Діскорд: @adattoweb"}</p>
                </SettingsBlock>
            </div>
        </div>
    );
}

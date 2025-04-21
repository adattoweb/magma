import "./Settings.css";
import white from "../../assets/white.png";
import black from "../../assets/black.png";
import bgDefault from "../../assets/bg1.png"
import theme1 from "../../assets/theme1.jpg"
import theme2 from "../../assets/theme2.jpg"
import theme3 from "../../assets/theme3.jpg"
import theme4 from "../../assets/theme4.jpg"
import theme5 from "../../assets/theme5.jpg"
import theme6 from "../../assets/theme6.jpg"
import theme7 from "../../assets/theme7.jpg"
import theme8 from "../../assets/theme8.jpg"
import theme9 from "../../assets/theme9.jpg"
import theme10 from "../../assets/theme10.jpg"
import theme11 from "../../assets/theme11.jpg"
import theme12 from "../../assets/theme12.jpg"
import theme13 from "../../assets/theme13.jpg"
import theme14 from "../../assets/theme14.jpg"
import theme15 from "../../assets/theme15.jpg"
import theme16 from "../../assets/theme16.jpg"
import triangle from "../../assets/triangle.png"
import triangleBlack from "../../assets/triangleBlack.png"

import { useState } from 'react'


export default function Settings({onChange}) {

    const [choosed, setChoosed] = useState(+localStorage.getItem("settings-bg"))

    function BackItem({image, name, id}){
        return (
            <div className={choosed === id ? "backitem newblock choosed" : "backitem newblock"} onClick={() => {
                setChoosed(id)
                localStorage.setItem("settings-bg", id)
                const root = document.getElementById("root")
                root.classList.forEach(el => {
                    if(el !== "wrapper") root.classList.remove(el)
                })
                root.classList.add(`theme${id}`)
            }}>
                <img src={image} />
                <div className="backitem__footer">
                    <p>{name}</p>
                    <div className="backitem__button">Активувати</div>
                </div>
            </div>
        )
    }

    function SettingsBlock({children, isNeedOpen, header}){
        // const [isOpen, setIsOpen] = useState(isNeedOpen)

        return (
            <div className="settings__block">
                <h2>
                    {header} 
                    {/* {!isNeedOpen && <img className={isOpen ? "settings__triangle active" : "settings__triangle"} src={localStorage.getItem("settings-theme") === "dark" ? triangle : triangleBlack}/>} */}
                    </h2>
                {/*isOpen &&*/ children}
            </div>
        )
    }

    const isEn = localStorage.getItem("settings-lang") === "en";

    return (
        <div className="settings content">
            <div className="settings__main newblock">
                <SettingsBlock isNeedOpen={true} header={isEn ? "Main Settings" : "Основні налаштування"}>
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
                    <div className="settings__theme">
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
                <SettingsBlock isNeedOpen={false} header={isEn ? "Background image" : "Фонове зображення"}>
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
                    </div>
                </SettingsBlock>
                <div className="settings__block">
                </div>
                <SettingsBlock isNeedOpen={true} header={isEn ? "Version" : "Версія"}>
                    <p className="settings__name">{isEn ? "Current version: Magma Local 0.3.0" : "Поточна версія: Magma Local 0.3.0"}</p>
                    <p className="settings__name">{isEn ? "Read the latest changes here:" : "Прочитати останні зміни можна:"} <a href="#">adattoweb.xyz</a></p>
                </SettingsBlock>
                <SettingsBlock isNeedOpen={true} header={isEn ? "Developer Contacts" : "Контакти розробника"}>
                    <p className="settings__name">{isEn ? "Discord: @adattoweb" : "Діскорд: @adattoweb"}</p>
                </SettingsBlock>
            </div>
        </div>
    );
}

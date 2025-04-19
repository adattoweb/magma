import "./Settings.css";
import white from "../../assets/white.png";
import black from "../../assets/black.png";

export default function Settings({onChange}) {
    // const [count, setCount] = useState(+localStorage.getItem("settings-size") || 0)
    // let localCount = localStorage.getItem("settings-size")
    // if (localCount === null) {
    //     localStorage.setItem("settings-size", "0")
    // } else {
    //     localStorage.setItem("settings-size", count)
    // }

    const isEn = localStorage.getItem("settings-lang") === "en";

    return (
        <div className="settings content">
            <div className="settings__main newblock">
                <div className="settings__block">
                    <h2>{isEn ? "Main Settings" : "Основні налаштування"}</h2>
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
                    {/* <div className="settings__size">
                        <p className="settings__name">{isEn ? "Add size (not recommended):" : "Додати розмір (не реком):"}</p>
                        <div className="size__select">
                            <p className="size__action" onClick={() => {
                                setCount(count + 1)
                            }}>+</p>
                            <p className="settings__info">{count}</p>
                            <p className="size__action" onClick={() => {
                                setCount(count - 1)
                            }}>-</p>
                        </div>
                    </div> */}
                </div>
                <div className="settings__block">
                    <h2>{isEn ? "Version" : "Версія"}</h2>
                    <p className="settings__name">{isEn ? "Current version: Atempus Local 0.1.0" : "Поточна версія: Atempus Local 0.2.0"}</p>
                    <p className="settings__name">{isEn ? "Read the latest changes here:" : "Прочитати останні зміни можна:"} <a href="#">adattoweb.xyz</a></p>
                </div>
                <div className="settings__block">
                    <h2>{isEn ? "Developer Contacts" : "Контакти розробника"}</h2>
                    <p className="settings__name">{isEn ? "Discord: @adattoweb" : "Діскорд: @adattoweb"}</p>
                </div>
            </div>
        </div>
    );
}

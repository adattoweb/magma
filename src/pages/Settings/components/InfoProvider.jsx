import SettingsBlock from "./SettingsBlock";
import Info from "./Info";

export default function InfoProvider(){
    const isEn = localStorage.getItem("settings-lang") === "en";
    return (
    <>
        <SettingsBlock>
            <Info/>
        </SettingsBlock>
        <SettingsBlock header={isEn ? "Version" : "Версія"}>
            <p className="settings__name">{isEn ? "Current version: Magma Local 0.22.2" : "Поточна версія: Magma Local 0.22.2"}</p>
            <p className="settings__name">{isEn ? "Read the latest changes here:" : "Прочитати останні зміни можна:"} <a href="#">adattoweb.xyz</a></p>
        </SettingsBlock>
    </>
    )
}
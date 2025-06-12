import SettingsBlock from "./SettingsBlock";

export default function InfoProvider({ children }){
    const isEn = localStorage.getItem("settings-lang") === "en";
    return (
    <>
        <SettingsBlock>
            {children}
        </SettingsBlock>
        <SettingsBlock header={isEn ? "Version" : "Версія"}>
            <p className="settings__name">{isEn ? "Current version: Magma Local 0.7.4" : "Поточна версія: Magma Local 0.7.4"}</p>
            <p className="settings__name">{isEn ? "Read the latest changes here:" : "Прочитати останні зміни можна:"} <a href="#">adattoweb.xyz</a></p>
        </SettingsBlock>
        <SettingsBlock header={isEn ? "Developer Contacts" : "Контакти розробника"}>
            <p className="settings__name">{isEn ? "Discord: @adattoweb" : "Діскорд: @adattoweb"}</p>
        </SettingsBlock>
    </>
    )
}
export default function SettingsItem({ header, children }) {
    return (
        <div className="settings__theme settings__lang">
            <p className="settings__name">{header}</p>
            {children}
        </div>
    )
}
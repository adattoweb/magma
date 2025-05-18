export default function SettingsBlock({ children, header }) {
    return (
        <div className="settings__block">
            <h2>
                {header}
            </h2>
            {children}
        </div>
    )
}
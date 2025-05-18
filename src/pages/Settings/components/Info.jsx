import HelpBlock from '../../Help/components/HelpBlock'

export default function Info() {
    const isEn = localStorage.getItem("settings-lang") === "en";
    return (
        <>
            <HelpBlock title={isEn ? "Briefly about Magma" : "Коротко про Magma"}>
                {isEn
                    ? "Magma is a time-tracking and management tool. It offers a powerful toolkit to help you track, analyze, and organize your time efficiently."
                    : "Magma — це інструмент для відстежування та керування власним часом. Вона пропонує потужний набір функцій для ефективного відстеження, аналізу та організації вашого часу."}
            </HelpBlock>

            <HelpBlock title={isEn ? "Main Advantages of Magma" : "Основні переваги Magma"}>
                {isEn
                    ? <>The main advantage of Magma is its <b>reliability</b> and <b>security</b>. All data is stored <b>locally</b> in your browser using cache, so your information stays private and safe.</>
                    : <>Головна перевага Magma — це <b>надійність</b> та <b>безпека</b>. Усі дані зберігаються <b>локально</b> у вашому браузері за допомогою кешу, тому ваша інформація залишається приватною та захищеною.</>}
            </HelpBlock>

            <HelpBlock title={isEn ? "Customization Options" : "Можливості кастомізації"}>
                {isEn
                    ? "You can fully customize the interface: switch between light and dark themes, upload your own background image, and adjust the appearance to your liking."
                    : "Ви можете повністю налаштувати інтерфейс під себе: перемикати тему між світлою та темною, додавати власне фонове зображення та змінювати зовнішній вигляд за бажанням."}
            </HelpBlock>

            <HelpBlock title={isEn ? "Magma Features Overview" : "Огляд функцій Magma"}>
                {isEn ? (
                    <>
                        <b>Trackers:</b> Create personal trackers and monitor how you spend your time.
                        <br />
                        <b>Analytics:</b> View charts and evaluate your time usage.
                        <br />
                        <b>Goals:</b> Set targets, follow your progress, and achieve success.
                        <br />
                        <b>Calendar:</b> Plan your days easily with a user-friendly calendar.
                        <br />
                        <b>Settings:</b> Change language, theme, and personalize your experience.
                    </>
                ) : (
                    <>
                        <b>Трекери:</b> Створюйте власні трекери та відстежуйте, як ви проводите час.
                        <br />
                        <b>Аналітика:</b> Переглядайте графіки та аналізуйте використання свого часу.
                        <br />
                        <b>Цілі:</b> Ставте цілі, слідкуйте за прогресом та досягайте результатів.
                        <br />
                        <b>Календар:</b> Плануйте свої дні за допомогою зручного календаря.
                        <br />
                        <b>Налаштування:</b> Змінюйте мову, тему та персоналізуйте свій досвід.
                    </>
                )}
            </HelpBlock>

            <HelpBlock title={isEn ? "Technologies Used" : "Використані технології"}>
                {isEn ? (
                    <>
                        The Magma website is built using:
                        <br />
                        — React library for building user interfaces
                        <br />
                        — React Router for navigating between pages
                    </>
                ) : (
                    <>
                        Сайт Magma створений з використанням:
                        <br />
                        — бібліотеки React для побудови інтерфейсу
                        <br />
                        — бібліотеки React Router для маршрутизації між сторінками
                    </>
                )}
            </HelpBlock>

        </>
    )
}
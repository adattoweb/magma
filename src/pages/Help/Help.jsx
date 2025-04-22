import HelpBlock from './components/HelpBlock'
import './Help.css'

export default function Help() {
    const isEn = localStorage.getItem("settings-lang") === "en";
    return (
        <div className="help content">
            <div className="help__content newblock">
                <HelpBlock title={isEn ? "Briefly about Magma" : "Коротко про Magma"}>
                    {isEn
                        ? "Magma is a tool for managing your own time. With Magma, you can track and analyze your time."
                        : "Magma — це інструмент для керування власним часом. За допомогою Magma ви можете відстежувати та аналізувати свій час."}
                </HelpBlock>

                <HelpBlock title={isEn ? 'About the "Trackers" and "Projects" pages' : 'Про сторінки "Трекери" та "Проєкти"'}>
                    {isEn
                        ? 'On the "Trackers" page, you can track your time — just write what you are doing, select the project it belongs to, and click the button.'
                        : 'На сторінці "Трекери" ви можете відстежувати свій час — просто вкажіть, чим ви зараз займаєтесь, оберіть проєкт, до якого це належить, і натисніть кнопку.'}
                    <br />
                    {isEn
                        ? 'On the "Projects" page, you can create projects that help group your activities.'
                        : 'На сторінці "Проєкти" ви можете створювати проєкти, за допомогою яких зручно групувати заняття.'}
                </HelpBlock>

                <HelpBlock title={isEn ? 'About the "Analytics" page' : 'Про сторінку "Аналітика"'}>
                    {isEn
                        ? 'The "Analytics" page shows a graphical representation of how you spent your week. You can also analyze past weeks.'
                        : 'Сторінка "Аналітика" показує графічне відображення того, чим ви займались протягом тижня. Також є можливість переглядати й аналізувати попередні тижні.'}
                </HelpBlock>

                <HelpBlock title={isEn ? 'About the "Goals" page' : 'Про сторінку "Цілі"'}>
                    {isEn
                        ? 'If you have a specific goal, for example to do X time of something, you can use this page. It contains a goal counter that you can increase or decrease.'
                        : 'Якщо у вас є певна ціль, наприклад, зробити щось X разів, ви можете скористатися цією сторінкою. Тут буде лічильник цілі, який можна збільшувати або зменшувати.'}
                </HelpBlock>

                <HelpBlock title={isEn ? 'About the "Calendar" page' : 'Про сторінку "Календар"'}>
                    {isEn
                        ? 'On this page, you can plan the next 7 days and one previous day.'
                        : 'На цій сторінці можна планувати наступні 7 днів і один минулий день.'}
                    <br />
                    {isEn
                        ? 'Create tasks and update their statuses.'
                        : 'Створюйте задачі та оновлюйте їхній статус.'}
                </HelpBlock>

                <HelpBlock title={isEn ? 'About the "Settings" page' : 'Про сторінку "Налаштування"'}>
                    {isEn
                        ? 'On this page, you can customize the appearance of the site. You can change the theme or language, and view the current version.'
                        : 'На цій сторінці можна налаштовувати зовнішній вигляд сайту. Користувач має можливість змінити тему або мову, а також переглянути поточну версію.'}
                </HelpBlock>
                <HelpBlock title={isEn ? 'How to add your own background image?' : 'Як додати своє фонове зображення?"'}>
                    {isEn ? (
                        <>
                            Go to imgur.com, upload your image, and copy the link to the image.
                            <br />
                            The link should look something like this: https://i.imgur.com/3FMGdsi.png
                            <br />
                            Go to Settings, find the "Choose your own background image" field, and paste the link.
                        </>
                    ) : (
                        <>
                            Перейдіть на сайт imgur.com, завантажте своє зображення, скопіюйте посилання на зображення.
                            <br />
                            Посилання повинно виглядати приблизно так: https://i.imgur.com/3FMGdsi.png
                            <br />
                            Перейдіть у налаштування, знайдіть поле "Обрати своє фонове зображення", вставте посилання.
                        </>
                    )}
                </HelpBlock>


            </div>
        </div>
    )
}
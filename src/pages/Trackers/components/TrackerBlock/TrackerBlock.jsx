import getDayDiff from "@/helpers/getDayDiff";
import formatTime from "@/helpers/formatTime";

export default function TrackerBlock({ header, children, all}) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    let dayDiff = getDayDiff(header);
    let displayHeader = dayDiff === 0 ? (isEn ? "Today" : "Сьогодні")
        : dayDiff === 1 ? (isEn ? "Yesterday" : "Вчора")
            : dayDiff === 2 ? (isEn ? "Day before yesterday" : "Позавчора")
                : header;

    return (
        <div className="tblock">
            <div className="tblock__header">
                <p>{displayHeader}</p>
                <p>{isEn ? "Total" : "Всього"}: <span>{formatTime(all)}</span></p>
            </div>
            <div className="tblock__list">
                {children}
            </div>
        </div>
    );
}
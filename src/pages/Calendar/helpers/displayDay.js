export default function displayDay(dayDiff, isEn, arrDays, dateDay){
    return dayDiff === 0 ? (isEn ? "Today" : "Сьогодні")
        : dayDiff === -1 ? (isEn ? "Tomorrow" : "Завтра")
            : dayDiff >= 1 ? (isEn ? "Expired" : "Просрочено")
                    : arrDays[dateDay.getDay()];
}
export default function displayDay(dayDiff, isEn, arrDays, dateDay){
    return dayDiff === 0 ? (isEn ? "Today" : "Сьогодні")
        : dayDiff === -1 ? (isEn ? "Tomorrow" : "Завтра")
                    : arrDays[dateDay.getDay()];
}
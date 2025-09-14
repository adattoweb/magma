import getDayDiff from "@/helpers/getDayDiff";

export default function getCalendar(startDate = new Date(), withOverdue = true) {
    let localKeys = Object.keys(localStorage);
    const isAdaptive = window.innerWidth < 1024

    let calendar = {};

    let sevenDays = [];
    for (let i = 1; i <= 7; i++) {
        let date = new Date(startDate)
        date.setDate(date.getDate() + i - 1);
        sevenDays.push(`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`);
    }
    console.log(sevenDays)
    for (let i = 0; i < sevenDays.length; i++) {
        if (calendar[sevenDays[i]] === undefined) {
            calendar[sevenDays[i]] = [];
        }
    }
    console.log(calendar)

    for (let i = 0; i < localKeys.length; i++) { // Створюємо об'єкт в якому будуть наші ключики і значення
        if (localKeys[i].includes("calendar-item")) {
            let localArr = localStorage.getItem(localKeys[i]).split("^")
            let date = localArr[2] + "." + localArr[3] + "." + localArr[4];

            let newDateFormat = date.split(".");
            let temp = newDateFormat[0];
            newDateFormat[0] = newDateFormat[2];
            newDateFormat[2] = temp;
            let newDate = newDateFormat.map(el => el.padStart(2, "0")).join(".");
            let dayDiff = getDayDiff(newDate);
            if (dayDiff >= 1 && !isAdaptive && withOverdue) {
                if (!calendar.overdue) {
                    calendar.overdue = [localKeys[i]]
                } else {
                    calendar.overdue.push(localKeys[i])
                }
            } else if(calendar[date]) {
                calendar[date].push(localKeys[i]);
            }
        }
    }
    console.log(calendar)
    for (let key in calendar) { // сортуємо задачі (спочатку найновіші потім внизу найстаріші)
        calendar[key].sort((a, b) => +localStorage.getItem(a).split("^")[7] - +localStorage.getItem(b).split("^")[7])
    }
    return calendar
}
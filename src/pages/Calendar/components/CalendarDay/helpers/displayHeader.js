import getDayDiff from "@/helpers/getDayDiff";
import displayDay from "./displayDay";

export default function displayHeader(date){
    const isEn = localStorage.getItem("settings-lang") === "en";
    let newDateFormat = date.split(".");
    let temp = newDateFormat[0];
    newDateFormat[0] = newDateFormat[2];
    newDateFormat[2] = temp;
    let newDate = newDateFormat.map(el => el.padStart(2, "0")).join(".");
    let dayDiff = getDayDiff(newDate);

    let [day, month, year] = newDate.split(".").map(Number);
    let dateDay = new Date(year, month - 1, day);

    let arrDays = [isEn ? "Sunday" : "Неділя", isEn ? "Monday" : "Понеділок", isEn ? "Tuesday" : "Вівторок", isEn ? "Wednesday" : "Середа", isEn ? "Thursday" : "Четвер", isEn ? "Friday" : "П'ятниця", isEn ? "Saturday" : "Субота"];

    return [displayDay(dayDiff, isEn, arrDays, dateDay), newDate]
}
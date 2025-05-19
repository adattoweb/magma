export default function formatDate(dateStr) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const [day, month, year] = dateStr.split(".").map(Number);
    const date = new Date(year, month - 1, day);
    const daysOfWeekUa = ["НД", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
    const daysOfWeekEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    if(isEn) return daysOfWeekEn[date.getDay()];
    else return daysOfWeekUa[date.getDay()];
};
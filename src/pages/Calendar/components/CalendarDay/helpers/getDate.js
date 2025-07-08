import displayHeader from "./displayHeader";

export default function getDate(isEn, date) {
    let [header, newDate] = [`${isEn ? "Overdue" : "Просрочено"}`, ""]
    if (date !== "overdue") {
        let [headerGived, newDateGived] = displayHeader(date)
        header = headerGived;
        newDate = newDateGived;
    }
    return [header, newDate]
}
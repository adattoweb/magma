import displayHeader from "./displayHeader";

export default function getDate(isEn, date, isAdaptive) {
    let [header, newDate] = [`${isEn ? "Overdue" : "Просрочено"}`, ""]
    if (date !== "overdue") {
        let [headerGived, newDateGived] = displayHeader(date)
        header = headerGived;
        newDate = newDateGived;
    }
    if(isAdaptive) newDate = newDate.split(".")[0]
    return [header, newDate]
}
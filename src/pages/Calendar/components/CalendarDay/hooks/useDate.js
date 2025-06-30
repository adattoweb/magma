import displayHeader from "../../../helpers/displayHeader";

export default function useDate(isEn, date) {
    let [header, newDate] = [`${isEn ? "Overdue" : "Просрочено"}`, ""]
    if (date !== "overdue") {
        let [headerGived, newDateGived] = displayHeader(date)
        header = headerGived;
        newDate = newDateGived;
    }
    return [header, newDate]
}
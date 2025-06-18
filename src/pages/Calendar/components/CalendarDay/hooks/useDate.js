import displayHeader from "../../../helpers/displayHeader";

export default function useDate(isEn, date) {
    let [header, newDate] = [`${isEn ? "Expired" : "Просрочено"}`, ""]
    if (date !== "expired") {
        let [headerGived, newDateGived] = displayHeader(date)
        header = headerGived;
        newDate = newDateGived;
    }
    return [header, newDate]
}
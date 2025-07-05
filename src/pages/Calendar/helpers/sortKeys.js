export default function getCalendarKeys(calendar){
    return Object.keys(calendar).sort((a, b) => {
        if (a === "overdue") return -1;
        else if (b === "overdue") return 1
        let dateA = new Date(...a.split(".").map(Number));
        let dateB = new Date(...b.split(".").map(Number));
        return dateA - dateB;
    });
}
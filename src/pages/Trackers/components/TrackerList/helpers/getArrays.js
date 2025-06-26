export default function getArrays() {
    let arrayKeys = [];
    let arrayDates = [];
    for (let key in localStorage) {
        if (!key.includes("tracker-item")) continue;
        let date = key.split("^")[1];
        if (date === undefined) {
            continue;
        }
        if (!arrayDates.includes(date)) {
            arrayDates.push(date);
            arrayKeys.push([key]);
        } else {
            arrayKeys[arrayDates.indexOf(date)].push(key);
        }
    }
    return [arrayKeys, arrayDates]
}
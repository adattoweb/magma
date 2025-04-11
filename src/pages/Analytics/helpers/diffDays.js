export default function diffDays(timeAll, days, array, arrayKeys){
    let now = new Date();
    for (let key in localStorage) {
        if (!key.includes("tracker-item")) continue;
        let dateStr = key.split("^")[1];
        if (!dateStr) continue; // якщо немає дати, пропускаємо

        let dateParts = dateStr.split("."); // розбиваємо дату (дд.мм.рррр)
        let date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); // створюємо об'єкт Date

        let diffDays = (now - date) / (1000 * 60 * 60 * 24); // різниця в днях
        if (diffDays <= days && diffDays > (days / 7 - 1) * 7) {
            // console.log(days, (days / 7 - 1) * 7);
            if (!arrayKeys.includes(dateStr)) {
                arrayKeys.push(dateStr);
                array.push([key]);
            } else {
                array[arrayKeys.indexOf(dateStr)].push(key);
            }
            timeAll += +localStorage.getItem(key).split("^")[4];
        }
    }
    return [timeAll, array, arrayKeys]
}
export default function getDayDiff(dateStr) {
    let now = new Date();
    let [day, month, year] = dateStr.split(".").map(Number);
    let date = new Date(year, month - 1, day); // Створюємо дату з рядка
    let diffTime = now.getTime() - date.getTime(); // Різниця в мс
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Конвертуємо в дні
}
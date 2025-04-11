export default function formatDate(dateStr) {
    const [day, month, year] = dateStr.split(".").map(Number);
    const date = new Date(year, month - 1, day); // Створюємо об'єкт Date
    const daysOfWeek = ["НД", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]; // Українські скорочення днів

    return daysOfWeek[date.getDay()]; // Отримуємо день тижня
};
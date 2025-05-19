export default function conSecTime(seconds) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const hours = Math.floor(seconds / 3600); // Вираховуємо години
    const minutes = Math.floor((seconds % 3600) / 60); // Вираховуємо хвилини
    if(isEn) return `${hours}h ${minutes}m`;
    return `${hours}г ${minutes}хв`;
}
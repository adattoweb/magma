export default function conSecTime(seconds) {
    const hours = Math.floor(seconds / 3600); // Вираховуємо години
    const minutes = Math.floor((seconds % 3600) / 60); // Вираховуємо хвилини
    return `${hours}г ${minutes}хв`;
}
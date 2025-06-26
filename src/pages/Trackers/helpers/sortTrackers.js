export default function sortTrackers(arrayKeys, array) {
    let combined = arrayKeys.map((key, index) => ({ key, items: array[index] }));

    combined.sort((a, b) => {
        let [dayA, monthA, yearA] = a.key.split(".").map(Number);
        let [dayB, monthB, yearB] = b.key.split(".").map(Number);
        return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA); // Сортуємо по спаданням
    });

    return {
        sortedKeys: combined.map(el => el.key),
        sortedArray: combined.map(el => el.items),
    };
}
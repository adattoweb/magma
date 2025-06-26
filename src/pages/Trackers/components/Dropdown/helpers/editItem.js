export default function editItem(actualValue, name) {
    if (name === "Без проєкту" || name === "Without project" || name === "All" || name === "Всі") return;
    let prArr = localStorage.getItem("tracker-projects").split("^");

    for (let i = 0; i < prArr.length; i++) { // злиття
        if (prArr[i] === actualValue) prArr.splice(i, 1);
    }

    for (let i = 0; i < prArr.length; i++) {
        if (prArr[i] === name) {
            prArr[i] = actualValue;
            break;
        }
    }
    let readp = Object.keys(localStorage);
    for (let i = 0; i < readp.length; i++) {
        if (readp[i].includes("tracker-item")) {
            let elem = localStorage.getItem(readp[i]).split("^")[1];
            if (elem === name) {
                let elemArr = localStorage.getItem(readp[i]).split("^");
                localStorage.setItem(`${readp[i]}`, `${elemArr[0]}^${actualValue}^${elemArr[2]}^${elemArr[3]}^${elemArr[4]}`);
            }
        }
    }
    localStorage.setItem("tracker-projects", prArr.join("^"));
}
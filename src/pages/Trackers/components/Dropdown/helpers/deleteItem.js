export default function deleteItem(name, setGlobalRender) {
    if (name === "Без проєкту" || name === "Without project" || name === "All" || name === "Всі") return;
    localStorage.setItem("tracker-projects", localStorage.getItem("tracker-projects").replace(name, ""));
    localStorage.setItem("tracker-projects", localStorage.getItem("tracker-projects").replace(/\^{2,}/g, "^").replace(/\^$/g, ""));
    let readp = Object.keys(localStorage);
    for (let i = 0; i < readp.length; i++) {
        if (readp[i].includes("tracker-item")) {
            let elem = localStorage.getItem(readp[i]).split("^")[1];
            if (elem === name) {
                let elemArr = localStorage.getItem(readp[i]).split("^");
                localStorage.setItem(`${readp[i]}`, `${elemArr[0]}^Без проєкту^${elemArr[2]}^${elemArr[3]}^${elemArr[4]}`);
            }
        }
    }
    setGlobalRender();
}
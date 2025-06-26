export default function getAllTime(el, objectKeys, project){
    let allTime = 0;
    for (let i = 0; i < objectKeys[el].length; i++) {
        let arrLocal = localStorage.getItem(objectKeys[el][i]).split("^");
        if (arrLocal[1] === project || project === "Всі") allTime += +arrLocal[4];
    }
    return allTime
}
export default function editName(actualValue, index, localList, name) {
    let tierArr = localList().split("^").map(el => el.split("@"));
    for (let i = 0; i < tierArr.length; i++) {
        if (tierArr[i][0] === name && +tierArr[i][1] === index) {
            tierArr[i][0] = actualValue;
            break;
        }
    }
    console.log(tierArr);
    tierArr = tierArr.map(el => el.join("@")).join("^");
    localStorage.setItem("tier-list", tierArr);
}
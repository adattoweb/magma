export default function editProperty(actualValue, propIndex, localList, index, name) {
    if ((propIndex === 2 && actualValue < 0) || (propIndex === 3 && actualValue <= 0)) return
    // if (propIndex === 2 && +actualValue > +max) return;
    // if (propIndex === 3 && +actualValue < +min) return;

    let tierArr = localList().split("^").map(el => el.split("@"));
    for (let i = 0; i < tierArr.length; i++) {
        if (tierArr[i][0] === name && +tierArr[i][1] === index) {
            tierArr[i][propIndex] = actualValue;
            break;
        }
    }
    tierArr = tierArr.map(el => el.join("@")).join("^");
    localStorage.setItem("goals-list", tierArr);
}
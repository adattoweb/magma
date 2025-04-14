export default function editPosition(newIndex, index, localList, setIsRender, isRender) {
    let tierArr = localList().split("^").map(el => el.split("@"));
    if (newIndex - 1 >= tierArr.length || newIndex === 0) return;
    let temp = tierArr[newIndex - 1];
    tierArr[newIndex - 1] = tierArr[index - 1];
    tierArr[index - 1] = temp;
    tierArr[newIndex - 1][1] = newIndex;
    tierArr[index - 1][1] = index;
    tierArr = tierArr.map(el => el.join("@")).join("^");
    localStorage.setItem("goals-list", tierArr);
    setIsRender(!isRender);
}
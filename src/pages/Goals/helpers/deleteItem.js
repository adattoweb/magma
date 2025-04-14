export default function deleteItem(index, localList, isRender, setIsRender) {
    let tierArr = localList().split("^");
    tierArr.splice(index - 1, 1);
    tierArr = tierArr.join("^");
    localStorage.setItem("goals-list", tierArr);
    setIsRender(!isRender);
}
export default function deleteItem(index, localList, setIsRender, isRender) {
    let tierArr = localList().split("^");
    tierArr.splice(index-1, 1);
    tierArr = tierArr.join("^");
    localStorage.setItem("tier-list", tierArr);
    setIsRender(!isRender);
}
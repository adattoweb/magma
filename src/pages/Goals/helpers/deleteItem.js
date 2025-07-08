export default function deleteItem(index, localList, setArray) {
    let newArray = localList().split("^");
    newArray.splice(index - 1, 1);
    setArray(newArray)
    newArray = newArray.join("^");
    localStorage.setItem("goals-list", newArray);
}
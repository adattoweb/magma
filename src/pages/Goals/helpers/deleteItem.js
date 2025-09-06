export default function deleteItem(localKey, setArray) {
    localStorage.removeItem(localKey)
    const index = localKey.split("-")[2]
    console.log(index, localStorage.getItem("goals-list").split("^"))
    const newArray = localStorage.getItem("goals-list").split("^").filter(i => +i !== +index)
    setArray(newArray)
    if(newArray.length === 0) localStorage.remove("goals-list")
    else localStorage.setItem("goals-list", newArray.join("^"))
}
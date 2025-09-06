export default function addItem(name, setArray) {
    let smallName = name
    let newName = smallName.replace(/(@|\^)+/g, ".");
    const index = localStorage.getItem("goals-index")
    localStorage.setItem("goals-index", +index+1)
    const now = new Date().getTime()
    const localGoals = localStorage.getItem("goals-list")
    let arrayIndexes = localGoals === null ? [] : localGoals?.split("^")
    localStorage.setItem(`goals-item-${index}`, `${newName}^0^${now}^0`)
    // name, counter, time, mode
    arrayIndexes.push(index)
    arrayIndexes = arrayIndexes.filter(el => el !== "")
    setArray(arrayIndexes)
    localStorage.setItem("goals-list", arrayIndexes.join("^"))
}
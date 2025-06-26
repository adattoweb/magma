export default function addItem(name, min, max) {
    let smallName = name
    if(name.length > 60) smallName = name.substring(0, 44) + "..."
    if(min < 0 || max <= 0) return
    let newName = smallName.replace(/(@|\^)+/g, ".");
    let readProjects = localStorage.getItem("goals-list") ?? "";
    let arr = readProjects.split("^").map(el => el.split("@"));
    let counter = 1;
    for (let i = 0; i < arr.length; i++) { // шукаємо повторення, якщо є то зупиняємо додавання.
        if (arr[i][0] === smallName) counter++;
    }
    if (counter > 1 || name.length === 0) return;
    let index = localStorage.getItem("goals-index");
    localStorage.setItem("goals-index", +index + 1);
    if (readProjects.length === 0) {
        localStorage.setItem("goals-list", `${newName}@${index}@${min}@${max}`);
    } else {
        localStorage.setItem("goals-list", `${localStorage.getItem("goals-list") }^${newName}@${index}@${min}@${max}`);
    }
    console.log(arr)
}
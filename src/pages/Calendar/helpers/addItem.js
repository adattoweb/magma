export default function addItem(name, desc, date, setName, setDesc, posIndex) {
    let dateArr = date.split(".");
    if (name.length === 0) return;
    let newName = name.replace(/(@|\^)+/g, ".");
    let index = +localStorage.getItem("calendar-index");
    localStorage.setItem("calendar-index", index+1);
    localStorage.setItem(`calendar-item-${index}`, `${newName}^${desc}^${dateArr[0]}^${dateArr[1]}^${dateArr[2]}^false^0^${posIndex}`);
    setName("")
    setDesc("")
}
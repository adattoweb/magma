export default function addItem(name, desc, date, setName, setDesc, posIndex, calendar, setCalendar) {
    const dateArr = date.split(".");
    if (name.length === 0) return;
    const newName = name.replace(/(@|\^)+/g, ".");
    const index = +localStorage.getItem("calendar-index");
    localStorage.setItem("calendar-index", index+1);
    const key = `calendar-item-${index}`
    localStorage.setItem(key, `${newName}^${desc}^${dateArr[0]}^${dateArr[1]}^${dateArr[2]}^false^0^${posIndex}^0`);
    setName("")
    setDesc("")

    const newCalendar = {...calendar}
    newCalendar[date].push(key)
    console.log(newCalendar)
    setCalendar(newCalendar)

}
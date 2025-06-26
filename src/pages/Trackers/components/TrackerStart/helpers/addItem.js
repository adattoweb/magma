export default function addItem(name, isEn, setTime, changeAdd, project, time){
    let startTime = "00:00";
    let endTime = "00:00";
    let smallName = name
    if(name.includes("^")) return
    if(name.length > 30) smallName = name.substring(0, 29) + "..."
    let newName = smallName?? smallName.replace(/(@|\^)+/g, ".");
    startTime = localStorage.getItem("tracker-start") ?? "00:00"
    const now = new Date();
    endTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    let mustName = name.length === 0 ? isEn ? "Without name" : "Без назви" : newName;
    let index = localStorage.getItem("tracker-index") ?? "0";
    localStorage.setItem(`tracker-item${index}^${now.getDate()}.${now.getMonth()+1}.${now.getFullYear()}`, `${mustName}^${project}^${startTime}^${endTime}^${time}`);
    localStorage.setItem("tracker-index", +index + 1 + "");
    setTime(0);
    changeAdd();
    localStorage.setItem("tracker-time", "0")
}
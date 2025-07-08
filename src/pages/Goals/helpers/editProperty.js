export default function editProperty(name, min, max, index, setArray) {
    
    const saved = localStorage.getItem("goals-list") || "";
    let newArray = saved.split("^").map(el => el.split("@"));
    for (let i = 0; i < newArray.length; i++) {
        if(newArray[i][1] === index){
            [newArray[i][0], newArray[i][2], newArray[i][3]] = [name, min, max]
        }
    }
    setArray(newArray)
    console.log("+")
    console.log(newArray)
    localStorage.setItem("goals-list", newArray.map(el => el.join("@")).join("^"));
}
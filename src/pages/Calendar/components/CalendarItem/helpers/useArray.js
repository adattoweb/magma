export default function getArray(isDisplay, elKey){
    let array = ["Name", "Desc", "1991", "08", "24", "false", "0", "0"]
    if(isDisplay){
        array = localStorage.getItem(elKey).split("^")
    }
    return array
}
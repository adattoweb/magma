export default function useDay(draggedKey, date, setSelectedDate, setSelectedKeys, keyArr, indexRef){
    if(draggedKey) {
        if(date !== "overdue") {
            setSelectedDate(date.split("."))
            setSelectedKeys(keyArr)
            if(keyArr.length === 0) indexRef.current = 0;
        }
        else return false
    }
}
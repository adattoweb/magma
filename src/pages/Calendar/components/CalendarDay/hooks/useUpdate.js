import { useEffect } from "react"

export default function useUpdate(draggingCount, selectedDate, date, indexRef, isTop, keyArr, setNewKeyArr) {
    function updateArr(){
        if (draggingCount > 0 && selectedDate?.join(".") === date) {
            const newArr = keyArr.filter(el => el !== "DRAGITEM")
            newArr.splice(isTop ? indexRef.current : indexRef.current + 1, 0, "DRAGITEM")
            setNewKeyArr(newArr)
        }
    }
    useEffect(() => {
        updateArr()
    }, [indexRef.current])
    
    useEffect(() => {
        setNewKeyArr(keyArr)
        updateArr()
    }, [keyArr])
}
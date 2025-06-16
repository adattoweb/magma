export default function useTime(e, time, setTimeStr, editItem, name, desc, isActive) {
    let value = e.target.value
    if (value.length > 8) return
    let arr = value.split(":")

    for (let i = 0; i < 3; i++) {
        if (!arr[i]) arr[i] = 0;
    }

    for (let i = 0; i < arr.length; i++) {
        if (Number.isNaN(arr[i])) arr[i] = 0
    }

    time.current = +arr[0] * 60 * 60 + +arr[1] * 60 + +arr[2]
    setTimeStr(value)
    editItem(name, desc, isActive)
}
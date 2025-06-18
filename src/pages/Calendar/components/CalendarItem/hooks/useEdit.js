export default function useEdit(actualName, actualDesc, actualIsActive, elKey, index, time) {
    let oldArr = localStorage.getItem(elKey).split("^")
    localStorage.setItem(`calendar-item-${index}`, `${actualName}^${actualDesc}^${oldArr[2]}^${oldArr[3]}^${oldArr[4]}^${actualIsActive}^${time.current}`);
}
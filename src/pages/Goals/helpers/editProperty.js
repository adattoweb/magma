export default function editProperty(localKey, name, counter, time, mode) {

    const array = localStorage.getItem(localKey)?.split("^")
    array[0] = name
    array[1] = counter
    array[2] = time
    array[3] = mode
    console.log(array)
    localStorage.setItem(localKey, array.join("^"))

}
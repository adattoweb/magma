export default function getObjectDates(arrayKeys, daysArray, array){
    let objectDates = {}
    for(let i = 0; i < 7; i++){
        if(!arrayKeys.includes(daysArray[i])) objectDates[daysArray[i]] = [];
        else {
            objectDates[daysArray[i]] = array[arrayKeys.indexOf(daysArray[i])]
        }
    }
    return objectDates
}
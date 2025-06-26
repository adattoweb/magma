import getAllTime from "./getAllTime"

export default function getMax(objectDates, project){
    let max = 0
    Object.keys(objectDates).map(el => {
        let allTime = getAllTime(el, objectDates, project)
        if(allTime > max) max = allTime
    })
    return max
}
export default function getDays(days){
    const now = new Date(new Date().getTime() - 86400000 * (days - 7));
    let daysArray = []
    for(let i = 0; i < 7; i++){
        const date = new Date(now.getTime() - 86400000 * i)
        daysArray.push(`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`)
    }
    daysArray = daysArray.reverse()
    return daysArray
}
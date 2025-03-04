import {useState} from 'react'
import "./Calendar.css"
import getDayDiff from '../getDayDiff'
import CalendarDay from './CalendarDay'

export default function Calendar(){
    if(localStorage.getItem("calendar-index") === null){
        localStorage.setItem("calendar-index", "0")
    }
    const [isRender, setIsRender] = useState(false)
    let localKeys = Object.keys(localStorage)
    
    let calendar = {}
    for(let i = 0; i < localKeys.length; i++){ // Створюємо об'єкт в якому будуть наші ключики і значення
        if(localKeys[i].includes("calendar-item")){
            let localArr = localKeys[i].split("@")[1].split("^")
            console.log(localArr)
            let date = localArr[2]+"." + localArr[3]+"." + localArr[4]

            let newDateFormat = date.split(".")
            let temp = newDateFormat[0]
            newDateFormat[0] = newDateFormat[2]
            newDateFormat[2] = temp
            let newDate = newDateFormat.map(el => el.padStart(2, "0")).join(".")
            let dayDiff = getDayDiff(newDate);
            console.log(dayDiff)
            if(dayDiff >= 3) continue;
            if(calendar[date] === undefined){
                calendar[date] = [localKeys[i]]
            } else{
                calendar[date].push(localKeys[i])
            }
        }
    }
    let sevenDays = []
    for(let i = 1; i <= 7; i++){
        let date = new Date();
        date.setDate(date.getDate() + i-1)
        sevenDays.push(`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`)
    }
    console.log(sevenDays)
    for(let i = 0; i < sevenDays.length; i++){
        if(calendar[sevenDays[i]] === undefined) {
            calendar[sevenDays[i]] = []
        }
    }
    console.log(calendar)
    console.log(Object.keys(calendar))
    let calendarKeys = Object.keys(calendar)
    calendarKeys.sort((a, b) => {
        let dateA = new Date(...a.split('.').map(Number));
        let dateB = new Date(...b.split('.').map(Number));
        return dateA - dateB;
    });
    return (
        <div className="calendar content">
            <div className="calendar__content">
                {calendarKeys.map(el => {
                    return <CalendarDay key={el} date={el} keyArr={calendar[el]} onChange={() => setIsRender(!isRender)} />
                })}
            </div>
        </div>
    )
}
// ЗРОБИ ТАК ЩОБ НЕ ВИВОДИЛОСЬ ПОЗАПОЗАВЧОРА, ТІЛЬКИ ЩОБ ВЧОРА І ПОЗАВЧОРА
import "./Analytics.css";
import { useState, useRef } from "react";
import Dropdown from "./Dropdown";
import triangle from "../assets/triangle.png";

export default function Analytics() {

    let timeAll = 0;

    const isEn = localStorage.getItem("settings-lang") === "en";

    const [days, setDays] = useState(7);
    // const [maxHeight, setMaxHeight] = useState(100); // у майбутньому
    const maxHeight = 100
    const [project, setProject] = useState("Всі");

    let array = []; // масив для групування за датами
    let arrayKeys = [];
    let now = new Date(); // поточна дата

    const page = useRef(1);
    console.log(timeAll);
    for (let key in localStorage) {
        if (!key.includes("tracker-item")) continue;
        let dateStr = key.split("^")[1];
        if (!dateStr) continue; // якщо немає дати, пропускаємо

        let dateParts = dateStr.split("."); // розбиваємо дату (дд.мм.рррр)
        let date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); // створюємо об'єкт Date

        let diffDays = (now - date) / (1000 * 60 * 60 * 24); // різниця в днях
        if (diffDays <= days && diffDays > (days / 7 - 1) * 7) {
            console.log(days, (days / 7 - 1) * 7);
            if (!arrayKeys.includes(dateStr)) {
                arrayKeys.push(dateStr);
                array.push([key]);
            } else {
                array[arrayKeys.indexOf(dateStr)].push(key);
            }
            timeAll += +localStorage.getItem(key).split("^")[4];
        }
    }

    console.log(array);
    console.log(arrayKeys);

    let uniqueArr = [];

    function sortTrackers(arrayKeys, array) {
        let combined = arrayKeys.map((key, index) => ({ key, items: array[index] }));

        combined.sort((a, b) => {
            let [dayA, monthA, yearA] = a.key.split(".").map(Number);
            let [dayB, monthB, yearB] = b.key.split(".").map(Number);
            return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB); // Сортуємо по спаданням
        });

        return {
            sortedKeys: combined.map(el => el.key),
            sortedArray: combined.map(el => el.items),
        };
    }

    let { sortedKeys, sortedArray } = sortTrackers(arrayKeys, array);
    arrayKeys = sortedKeys;
    array = sortedArray;

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            let taskName = localStorage.getItem(array[i][j]).split("^")[0];
            if (!uniqueArr.includes(taskName)) {
                uniqueArr.push(taskName);
            }
        }
    }

    const arrColor = ["#3D63DF", "#F9CB24", "#5BD22F", "#CA34E4", "#71DCE2", "#D93B3B", "#94D97B", "#6D84CD", "#F0A3A3", "#D47637", "#952727", "#587D4B", "#D685E4", "#6C34E4", "#42548C", "#7AAEB1", "#392466", "#3D6264", "#9573DE"];

    for (let i = 0; i < uniqueArr.length; i++) {
        uniqueArr[i] = uniqueArr[i] + "@" + arrColor[i];
    }
    console.log(uniqueArr);

    function AnalyticsBlock({ children, date, allTime }) {
        const formatDate = (dateStr) => {
            const [day, month, year] = dateStr.split(".").map(Number);
            const date = new Date(year, month - 1, day); // Створюємо об'єкт Date
            const daysOfWeek = ["НД", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]; // Українські скорочення днів

            return daysOfWeek[date.getDay()]; // Отримуємо день тижня
        };
        function conSecTime(seconds) {
            const hours = Math.floor(seconds / 3600); // Вираховуємо години
            const minutes = Math.floor((seconds % 3600) / 60); // Вираховуємо хвилини
            return `${hours}г ${minutes}хв`;
        }

        return (
            <div className="aitem">
                <h4>{conSecTime(allTime)}</h4>
                <div className="aitem__block" style={{ height: maxHeight + "px" }}>
                    {children}
                </div>
                <div className="aitem__info">
                    <h3>{date}</h3>
                    <h3>{formatDate(date)}</h3>
                </div>
            </div>
        );
    }
    function AnalyticsItem({ local, allTime }) {
        let arr = local.split("^");
        let name = arr[0];

        // Уникаємо ділення на 0
        // let height = allTime > 0 ? +arr[4] / Math.max(1, Math.floor(allTime / maxHeight)) : 0;
        let height = allTime > 0 ? maxHeight / (allTime / +arr[4]) : 0;

        let color = "#000";
        for (let i = 0; i < uniqueArr.length; i++) {
            let arr = uniqueArr[i].split("@");
            if (arr[0] === name) {
                color = arr[1];
            }
        }

        console.log(color);
        return <div className="aitem__color" style={{ backgroundColor: color, height: height + "px" }}></div>;
    }

    function FooterItem({ str }) {
        let arr = str.split("@");
        return (
            <div className="fitem">
                <div className="fitem__color" style={{ backgroundColor: arr[1] }}></div>
                <p className="fitem__name">{arr[0]}</p>
            </div>
        );
    }
    console.log(timeAll);
    const timeHour = (Math.floor(timeAll / 3600) + "").padStart(2, "0"); // Вираховуємо години
    const timeMin = (Math.floor((timeAll % 3600) / 60) + "").padStart(2, "0"); // Вираховуємо хвилини

    return (
        <div className={+days === 14 ? "analytics content bigAnal" : "analytics content"}>
            <div className="analytics__block">
                <div className="analytics__header">
                    <p className="analytics__time">Всього: {timeHour}:{timeMin} </p>
                    <Dropdown changeProject={(el) => setProject(el)} startValue={"Всі"} />
                    <div className="analytics__action">
                        <p>{(page.current - 1) * -1}</p>
                        <img src={triangle} onClick={() => {
                            setDays(days + 7);
                            page.current += 1;
                        }} />
                        <img src={triangle} onClick={() => {
                            if (page.current > 1) {
                                setDays(days - 7);
                                page.current -= 1;
                            }
                        }} />
                    </div>
                </div>
                <div className="analytics__content">
                    {arrayKeys.length === 0 ? <p className="error">{isEn ? "Unfortunately, there's nothing here" : "Нажаль, тут нічого нема"}</p> : arrayKeys.map((el, index) => {
                        let allTime = 0;
                        for (let i = 0; i < array[index].length; i++) {
                            let arrLocal = localStorage.getItem(array[index][i]).split("^");
                            if (arrLocal[1] === project || project === "Всі") allTime += +arrLocal[4];
                        }
                        if (allTime === 0) return;
                        return <AnalyticsBlock key={el + index} date={el} allTime={allTime}>{
                            array[index].map(key => {
                                let arrLocal = localStorage.getItem(key).split("^");
                                let time = +arrLocal[4];
                                let elProject = arrLocal[1];
                                if (elProject !== project && project !== "Всі") return;
                                if (time === 0) return;
                                return <AnalyticsItem key={key} local={localStorage.getItem(key)} allTime={allTime} />;
                            })}</AnalyticsBlock>;
                    })}
                </div>
                <div className="analytics__footer">
                    {uniqueArr.map((el, index) => {
                        return <FooterItem key={el + index} str={el} />;
                    })}
                </div>
            </div>
        </div>
    );
}
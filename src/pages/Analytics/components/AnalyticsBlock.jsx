import conSecTime from "../helpers/conSecTime";
import formatDate from "../helpers/formatDate";

import AnalyticsItem from "./AnalyticsItem"

export default function AnalyticsBlock({ date, allTime, max, maxHeight, isGray, objectTasks, project, uniqueColors, selected, setSelected, setSelectedData }) {
    const dateArr = date.split('.')
    function switchSelected(){
        let timestamp = new Date(+dateArr[2], +dateArr[1] - 1, +dateArr[0])
        const options = { weekday: "short", day: "numeric", month: "long" };
        setSelected(date)
        setSelectedData([conSecTime(allTime), timestamp.toLocaleString(undefined, options)])
    }
    function BlockLayout({ children }) {
        console.log(date)
        return (
            <div className={`aitem${selected === date ? " active" : ""}`} onClick={switchSelected}>
                <div className="aitem__block" style={{ height: maxHeight + "px" }}>
                    {children}
                </div>
                <div className="aitem__info">
                    <h3>{formatDate(date)}</h3>
                </div>
            </div>
        )
    }
    console.log("AnalyticsBlock render")
    if (isGray) {
        return (
            <BlockLayout><div className='aitem__color' style={{ backgroundColor: "#333", height: maxHeight + "px" }}></div></BlockLayout>
        );
    }
    const blockHeight = maxHeight / (max / allTime)
    console.log(blockHeight, maxHeight, max, allTime)
    return (
        <BlockLayout>
            {Object.keys(objectTasks).map(el =>
            objectTasks[el].map(key => {
                let arrLocal = localStorage.getItem(key).split("^");
                let time = +arrLocal[4];
                if (time === 0) return;
                let elProject = arrLocal[1];
                if (elProject !== project && project !== "Всі") return;
                return <AnalyticsItem key={key} local={localStorage.getItem(key)} allTime={allTime} maxHeight={blockHeight} uniqueColors={uniqueColors} />;
            })
        )}
        </BlockLayout>
    );
}
// <h3>{conSecTime(allTime)}</h3>
// {`${dateArr[0].padStart(2, "0")}.${dateArr[1].padStart(2, "0")}`},

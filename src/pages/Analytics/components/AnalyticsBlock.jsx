import conSecTime from "../helpers/conSecTime";
import formatDate from "../helpers/formatDate"

import AnalyticsItem from "./AnalyticsItem"

export default function AnalyticsBlock({ date, allTime, max, maxHeight, isGray, objectTasks, project, uniqueArr }) {
    const dateArr = date.split('.')
    function BlockLayout({ children }) {
        return (
            <div className="aitem">
                <div className="aitem__block" style={{ height: maxHeight + "px" }}>
                    {children}
                </div>
                <div className="aitem__info">
                    <h3>{conSecTime(allTime)}</h3>
                    <h3>{`${dateArr[0].padStart(2, "0")}.${dateArr[1].padStart(2, "0")}`}, {formatDate(date)}</h3>
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
        <BlockLayout>{Object.keys(objectTasks).map(NU =>
            objectTasks[NU].map(key => {
                let arrLocal = localStorage.getItem(key).split("^");
                let time = +arrLocal[4];
                if (time === 0) return;
                let elProject = arrLocal[1];
                if (elProject !== project && project !== "Всі") return;
                return <AnalyticsItem key={key} local={localStorage.getItem(key)} allTime={allTime} maxHeight={blockHeight} uniqueArr={uniqueArr} />;
            })
        )}
        </BlockLayout>
    );
}
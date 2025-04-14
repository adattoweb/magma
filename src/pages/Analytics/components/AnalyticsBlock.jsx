import conSecTime from "../helpers/conSecTime";
import formatDate from "../helpers/formatDate"

export default function AnalyticsBlock({ children, date, allTime, maxHeight}) {
    console.log("AnalyticsBlock render")
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
export default function AnalyticsItem({ local, allTime, maxHeight, uniqueArr }) {
    console.log("AnalyticsItem render")
    let arr = local.split("^");
    let name = arr[0];

    // Уникаємо ділення на 0
    // let height = allTime > 0 ? +arr[4] / Math.max(1, Math.floor(allTime / maxHeight)) : 0;
    let height = allTime > 0 ? maxHeight / (allTime / +arr[4]) : 0;
    if(height < 1) return

    let color = "#000";
    for (let i = 0; i < uniqueArr.length; i++) {
        let arr = uniqueArr[i].split("@");
        if (arr[0] === name) {
            color = arr[1];
        }
    }
    return <div className='aitem__color' style={{ backgroundColor: color, height: height + "px" }}></div>;
}
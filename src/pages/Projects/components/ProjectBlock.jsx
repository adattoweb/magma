import { useState } from "react";
import triangleBlack from "../../../assets/triangleBlack.png";
import formatTime from "../../../helpers/formatTime";
import deleteImg from "../../../assets/delete.png";

export default function ProjectBlock({ header, children, all, isRender, setIsRender }) {
    const isEn = localStorage.getItem("settings-lang") === "en"; // визначення мови
    const [isOpen, setIsOpen] = useState(false);
    const [headerValue, setHeaderValue] = useState(header);

    function deleteItem() {
        if (header === "Без проєкту") return;
        localStorage.setItem("tracker-projects", localStorage.getItem("tracker-projects").replace(headerValue, ""));
        localStorage.setItem("tracker-projects", localStorage.getItem("tracker-projects").replace(/\^{2,}/g, "^").replace(/\^$/g, ""));
        setIsRender(!isRender);
        let readp = Object.keys(localStorage);
        for (let i = 0; i < readp.length; i++) {
            if (readp[i].includes("tracker-item")) {
                let elem = localStorage.getItem(readp[i]).split("^")[1];
                if (elem === headerValue) {
                    let elemArr = localStorage.getItem(readp[i]).split("^");
                    localStorage.setItem(`${readp[i]}`, `${elemArr[0]}^Без проєкту^${elemArr[2]}^${elemArr[3]}^${elemArr[4]}`);
                }
            }
        }
    }

    function editItem(actualValue) {
        if (header === "Без проєкту") return;
        let prArr = localStorage.getItem("tracker-projects").split("^");

        for (let i = 0; i < prArr.length; i++) { // злиття
            if (prArr[i] === actualValue) prArr.splice(i, 1);
        }

        for (let i = 0; i < prArr.length; i++) {
            if (prArr[i] === headerValue) {
                prArr[i] = actualValue;
                break;
            }
        }
        let readp = Object.keys(localStorage);
        for (let i = 0; i < readp.length; i++) {
            if (readp[i].includes("tracker-item")) {
                let elem = localStorage.getItem(readp[i]).split("^")[1];
                if (elem === headerValue) {
                    let elemArr = localStorage.getItem(readp[i]).split("^");
                    localStorage.setItem(`${readp[i]}`, `${elemArr[0]}^${actualValue}^${elemArr[2]}^${elemArr[3]}^${elemArr[4]}`);
                }
            }
        }
        localStorage.setItem("tracker-projects", prArr.join("^"));
    }

    return (
        <div className="tblock">
            <div className="tblock__header">
                <div className="tblock__miniheader">
                    {header === "Без проєкту" ? <p>{isEn ? "Without project" : "Без проєкту"}</p> : <input type="text" onChange={(e) => {
                        setHeaderValue(e.target.value);
                        editItem(e.target.value);
                    }} value={headerValue} />}

                    <p>{isEn ? "Total: " : "Всього: "} <span>{formatTime(all)}</span></p>
                    <img src={triangleBlack} onClick={() => {
                        setIsOpen(!isOpen);
                    }} className={isOpen ? "active" : ""} />
                </div>
                <div className="pblock__menu">
                    {header !== "Без проєкту" && <img src={deleteImg} onClick={deleteItem} />}
                </div>
            </div>
            <div className="tblock__list">
                {isOpen && children}
            </div>
        </div>
    );
}
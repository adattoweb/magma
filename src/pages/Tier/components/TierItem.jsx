import { useState} from "react";
import editPosition from "../helpers/editPosition";
import deleteItem from "../helpers/deleteItem"
import editName from "../helpers/editName"

import deleteImg from "../../../assets/delete.png";
import arrow from "../../../assets/arrow.png";

export default function TierItem({ startName, index, localIndex, setIsRender, isRender, localList}) {
    const [name, setName] = useState(startName);
    if (index !== localIndex) localStorage.setItem("tier-list", localStorage.getItem("tier-list").replace(`${name}@${localIndex}`, `${name}@${index}`));
    return (
        <div className="titem tierlist">
            <div className="titem__edit">
                <div className="titem__circle">{+index}</div>
                <input type="text" value={name} onChange={(e) => {
                    setName(e.target.value);
                    editName(e.target.value, index, localList, name);
                }} />
            </div>
            <div className="titem__info">
                <div className="titem__time">
                    <img src={arrow} onClick={() => editPosition(index+1, localList, index, setIsRender, isRender)} />
                    <img src={arrow} onClick={() => editPosition(index-1, localList, index, setIsRender, isRender)} />
                </div>
                <div className="titem__delete">
                    <img src={deleteImg} onClick={() => deleteItem(index, localList, setIsRender, isRender)} />
                </div>
            </div>
        </div>
    );
}
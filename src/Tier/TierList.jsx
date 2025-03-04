import './Tier.css'
import { useState, useRef } from 'react'
import deleteImg from '../assets/delete.png'
import arrow from '../assets/arrow.png'

export default function TrackerList() {
    const isEn = localStorage.getItem("settings-lang") === "en"; // визначаємо мову

    if (localStorage.getItem("tier-list") !== null) {
        localStorage.setItem("tier-list", localStorage.getItem("tier-list").replace(/\^{2,}/g, ""))
    }
    const [isRender, setIsRender] = useState(false) // чисто щоб рендерити наново увесь компонент


    function TrackerItem({ startName, index, localIndex }) {
        const [name, setName] = useState(startName)
        if (index !== localIndex) localStorage.setItem("tier-list", localStorage.getItem("tier-list").replace(`${name}@${localIndex}`, `${name}@${index}`))
        function editName(actualValue) {
            let tierArr = localStorage.getItem("tier-list").split("^").map(el => el.split("@"))
            for(let i = 0; i < tierArr.length; i++){
                if(tierArr[i][0] === name && +tierArr[i][1] === index) {
                    tierArr[i][0] = actualValue;
                    break;
                }
            }
            console.log(tierArr)
            tierArr = tierArr.map(el => el.join("@")).join("^")
            localStorage.setItem("tier-list", tierArr)

        }
        function editPosition(newIndex){
            let tierArr = localStorage.getItem("tier-list").split("^").map(el => el.split("@")) 
            if(newIndex-1 >= tierArr.length || newIndex === 0) return
            console.log(newIndex)
            let temp = tierArr[newIndex-1]
            tierArr[newIndex-1] = tierArr[index-1]
            tierArr[index-1] = temp
            tierArr[newIndex-1][1] = newIndex;
            tierArr[index-1][1] = index

            console.log(tierArr)
            tierArr = tierArr.map(el => el.join("@")).join("^")
            localStorage.setItem("tier-list", tierArr)
            setIsRender(!isRender)
        }
        function deleteItem() {
            let tierArr = localStorage.getItem("tier-list").split("^")
            tierArr.splice(index-1, 1)
            tierArr = tierArr.join("^")
            localStorage.setItem("tier-list", tierArr)
            setIsRender(!isRender)
        }
        return (
            <div className="titem tierlist">
                <div className="titem__edit">
                    <div className="titem__circle">{+index}</div>
                    <input type="text" value={name} onChange={(e) => {
                        setName(e.target.value)
                        editName(e.target.value)
                    }} />
                </div>
                <div className="titem__info">
                    <div className="titem__time">
                        <img src={arrow} onClick={() => editPosition(index+1)} />
                        <img src={arrow} onClick={() => editPosition(index-1)} />
                    </div>
                    <div className="titem__delete">
                        <img src={deleteImg} onClick={deleteItem} />
                    </div>
                </div>
            </div>
        )
    }
    let array = localStorage.getItem("tier-list").split("^").map(el => el.split("@"))
    return (
        <div className="tlist">
            <div className="tlist__header">
                {isEn ? "Tier List of Tasks" : "Тірліст задач"}
            </div>
            <div className="tlist__list">
                {localStorage.getItem("tier-list").length === 0 ? 
                    <p className="tier__error">{isEn ? "Sorry, there is nothing here!" : "Нажаль тут нічого немає!"}</p> 
                    : array.map((el, index) => {
                        return <TrackerItem key={el + index} startName={el[0]} index={index + 1} localIndex={el[1]} />
                    })}
            </div>
        </div>
    )
}

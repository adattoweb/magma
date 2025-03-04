import './Projects.css'
import {useState, useRef} from 'react'
import formatTime from '../formatTime'
import Dropdown from '../Dropdown'
import deleteImg from '../assets/delete.png'
import triangleBlack from '../assets/triangleBlack.png'

export default function TrackerList() {
    const isEn = localStorage.getItem("settings-lang") === "en"; // визначення мови
    if(localStorage.getItem("tracker-projects") === null){
        localStorage.setItem("tracker-projects", localStorage.getItem("tracker-projects").replace(/\^{2,}/g, ""))
    }
    const [isRender, setIsRender] = useState(false)

    let projects = {}

    let projectsArr = localStorage.getItem("tracker-projects") === null ? ["Без проєкту"] : localStorage.getItem("tracker-projects").split("^")

    for(let i = 0; i < projectsArr.length; i++){
        if(projects[projectsArr[i]] === undefined){
            projects[projectsArr[i]] = []
        }
    }
    console.log(projects)
    let rp = Object.keys(localStorage)
    for(let i = 0; i < rp.length; i++){
        if(rp[i].includes("tracker-item")){
            let project = localStorage.getItem(rp[i]).split("^")[1]
            console.log(project)
            projects[project].push(rp[i])
        }
    }
    console.log(projects)

    function TrackerBlock({ header, children, all }) {
        const [isOpen, setIsOpen] = useState(false)
        const [headerValue, setHeaderValue] = useState(header)

        function deleteItem(){
            if(header === "Без проєкту") return
            localStorage.setItem("tracker-projects", localStorage.getItem("tracker-projects").replace(headerValue, ""))
            localStorage.setItem("tracker-projects", localStorage.getItem("tracker-projects").replace(/\^{2,}/g, "^").replace(/\^$/g, ""))
            setIsRender(!isRender)
            let readp = Object.keys(localStorage)
            for(let i = 0; i < readp.length; i++){
                if(readp[i].includes("tracker-item")){
                    let elem = localStorage.getItem(readp[i]).split("^")[1]
                    if(elem === headerValue){
                        let elemArr = localStorage.getItem(readp[i]).split("^")
                        localStorage.setItem(`${readp[i]}`, `${elemArr[0]}^Без проєкту^${elemArr[2]}^${elemArr[3]}^${elemArr[4]}`)
                    }
                }
            }
        }

        function editItem(actualValue){
            if(header === "Без проєкту") return
            let prArr = localStorage.getItem("tracker-projects").split("^")

            for(let i = 0; i < prArr.length; i++){ // злиття
                if(prArr[i] === actualValue) prArr.splice(i, 1)
            }

            for(let i = 0; i < prArr.length; i++){
                if(prArr[i] === headerValue){
                    prArr[i] = actualValue
                    break;
                }
            }
            let readp = Object.keys(localStorage)
            for(let i = 0; i < readp.length; i++){
                if(readp[i].includes("tracker-item")){
                    let elem = localStorage.getItem(readp[i]).split("^")[1]
                    if(elem === headerValue){
                        let elemArr = localStorage.getItem(readp[i]).split("^")
                        localStorage.setItem(`${readp[i]}`, `${elemArr[0]}^${actualValue}^${elemArr[2]}^${elemArr[3]}^${elemArr[4]}`)
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
                            setHeaderValue(e.target.value)
                            editItem(e.target.value)
                        }}  value={headerValue}/>}

                        <p>{isEn ? "Total: " : "Всього: "} <span>{formatTime(all)}</span></p>
                        <img src={triangleBlack} onClick={() => {
                            setIsOpen(!isOpen)
                        }} className={isOpen ? 'active' : ''}/>
                    </div>
                    <div className="pblock__menu">
                        {header !== "Без проєкту" && <img src={deleteImg} onClick={deleteItem}/>}
                    </div>
                </div>
                <div className="tblock__list">
                    {isOpen && children}
                </div>
            </div>
        );
    }
    
    function TrackerItem({myKey, name, project, start, end, all}) {
        const [newName, setNewName] = useState(name)
        const [newProject, setNewProject] = useState(project)
        const [newStart, setNewStart] = useState(start)
        const [newEnd, setNewEnd] = useState(end)
        const [newAll, setNewAll] = useState(all)

        function editItem(name = newName, project = newProject, start=newStart, end=newEnd, all=newAll){
            localStorage.setItem(myKey, `${name}^${project}^${start}^${end}^${all}`)
        }

        function editTime(e, start){
            if(!e.target.value.includes(":") || e.target.value.length > 5) return;
            if(start) setNewStart(e.target.value)
            else setNewEnd(e.target.value)
            let startArr = []
            let endArr = []
            if(start) { 
                startArr = e.target.value.split(":");
                endArr = newEnd.split(":");
            }
            else {
                startArr = newStart.split(":")
                endArr = e.target.value.split(":");
            }
            let res = e.target.value.split(":")
            res[0] = res[0].padStart(2, "0")
            res[1] = res[1].padStart(2, "0")
            res = res.join(":")
            console.log(startArr, endArr)
            let myAll = Math.abs((+endArr[0] * 60 * 60 + +endArr[1] * 60) - (+startArr[0] * 60 * 60 + +startArr[1] * 60))
            console.log("-----")
            console.log(myAll)
            setNewAll(myAll)
            if(start) editItem(newName, newProject, res, newEnd, myAll)
            else editItem(newName, newProject, newStart, res, myAll)
        }

        const [isHidden, setIsHidden] = useState(false)
        return (
            <div className={isHidden ? "titem none" : "titem"}>
                <div className="titem__edit">
                    <input type="text" value={newName} onChange={(e) => {
                        setNewName(e.target.value)
                        editItem(e.target.value)
                    }} />
                    <Dropdown startValue={newProject} editProject={(value) => {
                        setNewProject(value)
                        editItem(newName, value)
                        }}/>
                </div>
                <div className="titem__info">
                    <div className="titem__time"><input type="text" value ={newStart} onChange={(e) => editTime(e, true)}/> <p>-</p> <input type="text" value={newEnd} onChange={(e) => editTime(e,false)}/></div>
                    <div className="titem__delete">
                        <p>{formatTime(newAll)}</p>
                        <img src={deleteImg} onClick={() => {
                            localStorage.removeItem(myKey)
                            setIsHidden(true)
                        }}/>
                    </div>
                </div>
            </div>
        )
    }

    let array = Object.keys(projects)
    for(let i = 0; i < array.length; i++){ 
        if(array[i] === "Без проєкту"){
            array.splice(i, 1)
            array.unshift("Без проєкту")
            break;
        }
    }

    return (
        <div className="tlist">
            <div className="tlist__header">
                {isEn ? "All projects" : "Всі проєкти"}
            </div>
            <div className="tlist__list">
                {array.length === 0 ? <p className="error">{isEn ? "Sorry, nothing here" : "Нажаль, тут нічого нема"}</p> : array.map((el, index) => {
                    let allTime = projects[el].reduce((total, key) => total + +localStorage.getItem(key).split("^")[4],0)
                    return <TrackerBlock key={el+index} header={el} all={allTime}>
                        {projects[el].map((childEl) =>{
                            let now = localStorage.getItem(childEl).split("^");
                            return <TrackerItem key={childEl} myKey={childEl} name={now[0]} project = {now[1]} start = {now[2]} end = {now[3]} all = {now[4]}/>
                        })}
                    </TrackerBlock>
                })}
            </div>
        </div>
    )
}
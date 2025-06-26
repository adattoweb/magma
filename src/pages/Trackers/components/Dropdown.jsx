import { useState } from "react";
import triangle from "@/assets/triangle.png";
import deletePng from "@/assets/delete.png";
import edit from "@/assets/edit.png"

export default function Dropdown({ project, setProject, setPage, setGlobalRender }) {
    const isEn = localStorage.getItem("settings-lang") === "en";
    const [isOpen, setIsOpen] = useState(false);

    function DropAdd({ makeRender }) {
        const [projectValue, setProjectValue] = useState("")

        function addProject() {
            if(projectValue === "Without project" || projectValue === "Без проєкту" || projectValue === "All" || projectValue === "Всі") return
            let smallName = projectValue
            if (projectValue.length > 45) smallName = projectValue.substring(0, 44) + "..."
            let newName = smallName.replace(/(@|\^)+/g, ".");
            let readProjects = localStorage.getItem("tracker-projects");
            let arr = readProjects.split("^");
            let counter = 1;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === smallName) counter++;
            }
            if (counter > 1 || projectValue.length === 0) return;
            if (readProjects.length === 0) {
                localStorage.setItem("tracker-projects", `${newName}`);
            } else {
                localStorage.setItem("tracker-projects", `${localStorage.getItem("tracker-projects")}^${newName}`);
            }
            makeRender()
        }

        return (
            <div className="dropdown__add">
                <input type="text" placeholder={isEn ? "Enter a name of project" : "Введіть назву проєкту"} value={projectValue} onChange={(e) => setProjectValue(e.target.value)} />
                <div className="dropdown__create" onClick={addProject}>{isEn ? "Create" : "Створити"} +</div>
            </div>)
    }

    function DropdownContent() {
        const array = localStorage.getItem("tracker-projects") === null ? ["Без проєкту"] : localStorage.getItem("tracker-projects").split("^");
        array.unshift(isEn ? "All" : "Всі")
        const [render, setRender] = useState(false)

        function DropdownItem({ el }){
            const [isEdit, setIsEdit] = useState(false)
            const [name, setName] = useState(el)
            function selectProject(){
                setProject(name);
                setPage(0)
                setIsOpen(!isOpen)
            }
            function deleteItem() {
                if (name === "Без проєкту" || name === "Without project" || name === "All" || name === "Всі") return;
                localStorage.setItem("tracker-projects", localStorage.getItem("tracker-projects").replace(name, ""));
                localStorage.setItem("tracker-projects", localStorage.getItem("tracker-projects").replace(/\^{2,}/g, "^").replace(/\^$/g, ""));
                let readp = Object.keys(localStorage);
                for (let i = 0; i < readp.length; i++) {
                    if (readp[i].includes("tracker-item")) {
                        let elem = localStorage.getItem(readp[i]).split("^")[1];
                        if (elem === name) {
                            let elemArr = localStorage.getItem(readp[i]).split("^");
                            localStorage.setItem(`${readp[i]}`, `${elemArr[0]}^Без проєкту^${elemArr[2]}^${elemArr[3]}^${elemArr[4]}`);
                        }
                    }
                }
                setGlobalRender();
            }
            function editItem(actualValue) {
                if (name === "Без проєкту" || name === "Without project" || name === "All" || name === "Всі") return;
                let prArr = localStorage.getItem("tracker-projects").split("^");
        
                for (let i = 0; i < prArr.length; i++) { // злиття
                    if (prArr[i] === actualValue) prArr.splice(i, 1);
                }
        
                for (let i = 0; i < prArr.length; i++) {
                    if (prArr[i] === name) {
                        prArr[i] = actualValue;
                        break;
                    }
                }
                let readp = Object.keys(localStorage);
                for (let i = 0; i < readp.length; i++) {
                    if (readp[i].includes("tracker-item")) {
                        let elem = localStorage.getItem(readp[i]).split("^")[1];
                        if (elem === name) {
                            let elemArr = localStorage.getItem(readp[i]).split("^");
                            localStorage.setItem(`${readp[i]}`, `${elemArr[0]}^${actualValue}^${elemArr[2]}^${elemArr[3]}^${elemArr[4]}`);
                        }
                    }
                }
                localStorage.setItem("tracker-projects", prArr.join("^"));
            }
            return (
                <div className="dropdown__item">{isEdit ? <input type="text" value={name} onChange={(e) => {
                    setName(e.target.value)
                    editItem(e.target.value)
                }}/> : <p onClick={selectProject}>{isEn && name === "Без проєкту" ? "Without project" : name}</p>}
                    {(name !== "Без проєкту" && name !== "Without project" && name !== "All" && name !== "Всі") && <div className="dropdown__edit">
                        <img src={edit} alt="edit project" onClick={() => {
                            if(name !== "Без проєкту" && name !== "Without project" && name !== "All" && name !== "Всі") setIsEdit(!isEdit)
                        }}/>
                        <img src={deletePng} alt="delete project" onClick={deleteItem}/>
                    </div>}
                </div>
            )
        }

        return (
            <div className='dropdown-content'>
                {array.map((el, index) => <DropdownItem key={el+index} el={el}/>)}
                <DropAdd makeRender={() => setRender(!render)} />
            </div>
        )
    }

    return (
        <div className='dropdown'>
            <button className='dropdown-btn' onClick={() => setIsOpen(!isOpen)}><p>{isEn && project === "Без проєкту" ? "Without project" : project}</p><img className={isOpen ? 'rotate' : ""} src={triangle} /></button>
            {isOpen && <DropdownContent />}
        </div>
    );
}
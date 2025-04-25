import {useState} from "react";
import ProjectBlock from "./ProjectBlock";
import ProjectItem from "./ProjectItem";

export default function ProjectList() {
    const isEn = localStorage.getItem("settings-lang") === "en"; // визначення мови
    if(localStorage.getItem("tracker-projects") === null){
        localStorage.setItem("tracker-projects", localStorage.getItem("tracker-projects").replace(/\^{2,}/g, ""));
    }
    const [isRender, setIsRender] = useState(false);

    let projects = {};

    let projectsArr = localStorage.getItem("tracker-projects") === null ? ["Без проєкту"] : localStorage.getItem("tracker-projects").split("^");

    for(let i = 0; i < projectsArr.length; i++){
        if(projects[projectsArr[i]] === undefined){
            projects[projectsArr[i]] = [];
        }
    }
    console.log(projects);
    let rp = Object.keys(localStorage);
    for(let i = 0; i < rp.length; i++){
        if(rp[i].includes("tracker-item")){
            let project = localStorage.getItem(rp[i]).split("^")[1];
            console.log(project);
            projects[project].push(rp[i]);
        }
    }
    console.log(projects);

    let array = Object.keys(projects);
    for(let i = 0; i < array.length; i++){ 
        if(array[i] === "Без проєкту"){
            array.splice(i, 1);
            array.unshift("Без проєкту");
            break;
        }
    }
    const [page, setPage] = useState(0)
    const elementsOnPage = 15
    let pagesArray = []
    for(let i = 0; i < array.length / elementsOnPage; i++){
        pagesArray.push(i)
    }
    let counterItems = 0;

    function PagesButton({num, page, onClick}){
        return <div className={page === num ? "tpages__button newblock choosed" : "tpages__button newblock"} onClick={onClick}>{num}</div>
    }

    return (
        <div className="tlist newblock">
            <div className="tlist__header newblock">
                {isEn ? "All projects" : "Всі проєкти"}
            </div>
            <div className="tlist__list">
                {array.length === 0 ? <p className="error">{isEn ? "Sorry, nothing here" : "Нажаль, тут нічого нема"}</p> : array.map((el, index) => {
                    let allTime = projects[el].reduce((total, key) => total + +localStorage.getItem(key).split("^")[4],0);
                    counterItems++;
                    if(counterItems-1 >= elementsOnPage * (page+1) - elementsOnPage && counterItems-1 < elementsOnPage * (page+1)){
                        return <ProjectBlock key={el+index} header={el} all={allTime} isRender={isRender} setIsRender={setIsRender}>
                        {projects[el].map((childEl) =>{
                            let now = localStorage.getItem(childEl).split("^");
                            return <ProjectItem key={childEl} myKey={childEl} name={now[0]} project = {now[1]} start = {now[2]} end = {now[3]} all = {now[4]}/>;
                        })}
                    </ProjectBlock>;
                    }
                })}
            </div>
            {
                pagesArray.length > 1 && <div className="tpages">
                    {pagesArray.map((el, index) => {
                        return <PagesButton key={index + el} page={page} num={index} onClick={() => setPage(index)} />
                    })}
                </div>
            }
        </div>
    );
}
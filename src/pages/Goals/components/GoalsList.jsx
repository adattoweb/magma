import GoalsItem from "./GoalsItem";
import { useState } from "react";

import { closestCorners, DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor, DragOverlay } from "@dnd-kit/core";
import { arrayMove, verticalListSortingStrategy, SortableContext  } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

export default function GoalsList({ array, setArray }) {
    const isEn = localStorage.getItem("settings-lang") === "en";

    if (localStorage.getItem("goals-list") !== null) {
        localStorage.setItem("goals-list", localStorage.getItem("goals-list").replace(/\^{2,}/g, ""));
    }

    let allMin = 0;
    let allMax = 0;

    for (let i = 0; i < array.length; i++) {
        allMin += +array[i][2];
        allMax += +array[i][3];
    }

    const [page, setPage] = useState(0)
    const elementsOnPage = 15
    let pagesArray = []
    for(let i = 0; i < array.length / elementsOnPage; i++){
        pagesArray.push(i)
    }

    function PagesButton({num, page, onClick}){
        return <div className={page === num ? "tpages__button newblock choosed" : "tpages__button newblock"} onClick={onClick}>{num}</div>
    }

    const uniqueIndexes = []

    for(let i = 0; i < array.length; i++){
        uniqueIndexes.push(array[i][1])
    }

    console.log(uniqueIndexes)
    console.log(array)

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {
            distance: 10, // активується drag тільки якщо курсор змістився на 10+ пікселів
          }}),
        useSensor(KeyboardSensor),
    )

    function findItemByIndex(index){
        if(index === undefined) return []
        for(let i = 0; i < array.length; i++){
            if(array[i][1] === index) return [array[i], i]
        }
        throw new Error("Виникла критична помилка. Елементу не знайдено, це непередбачуванна поведінка.")
    }

    const [active, setActive] = useState(undefined)

    function handleDragStart({ active }){
        setActive(active.id)
    }
    function handleDragOver({ active, over }){
        const [, activePosition] = findItemByIndex(active.id)
        const [, overPosition] = findItemByIndex(over.id)
        const newArray = arrayMove([...array], activePosition, overPosition)
        setArray(newArray)
        console.log(newArray)
        localStorage.setItem("goals-list", newArray.map(el => el.join("@")).join("^"))
    }
    function handleDragEnd(){
        setActive(undefined)
    }
    const [actualItem, actualIndex] = findItemByIndex(active)

    return (
        <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} sensors={sensors} modifiers={[restrictToWindowEdges]}>
            <div className="glist tlist newblock">
                <div className="tlist__header newblock">
                    {isEn ? "Goals" : "Цілі"} {allMin || 0}/{allMax || 0}
                </div>
                <div className="tlist__list">
                <SortableContext items={uniqueIndexes} strategy={verticalListSortingStrategy}>
                    {array.length === 0 ?
                        <p className="error">{isEn ? "Unfortunately, there is nothing here!" : "Нажаль тут нічого немає!"}</p> 
                        : array.map((el, index) => {
                            if(index >= elementsOnPage * (page+1) - elementsOnPage && index < elementsOnPage * (page+1)){
                                return <GoalsItem key={el[1]} array={el} index={index + 1} setArray={setArray} active={active}/>
                            }
                        }
                    )}
                </SortableContext>
                </div>
                {pagesArray.length > 1 && <div className="tpages">
                    {pagesArray.map((el, index) => {
                        return <PagesButton key={index + el} page={page} num={index} onClick={() => setPage(index)}/>
                    })}
                </div>}
            </div>
                <DragOverlay >
                {active && <GoalsItem key={actualItem[1]} array={actualItem} index={actualIndex + 1} setArray={setArray} active={active} isDraggable={true}/>}
            </DragOverlay>
        </DndContext>
    );
}

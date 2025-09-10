import GoalsItem from "./GoalsItem";
import { useState } from "react";

import { closestCorners, DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor, DragOverlay, TouchSensor } from "@dnd-kit/core";
import { arrayMove, verticalListSortingStrategy, SortableContext  } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

export default function GoalsList({ array, setArray }) {
    const isEn = localStorage.getItem("settings-lang") === "en";

    if (localStorage.getItem("goals-list") !== null) {
        localStorage.setItem("goals-list", localStorage.getItem("goals-list").replace(/\^{2,}/g, ""));
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

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {
            distance: 10, // активується drag тільки якщо курсор змістився на 10+ пікселів
          }}),
        useSensor(KeyboardSensor),
        useSensor(TouchSensor)
    )

    const [active1, setActive] = useState(undefined)

    function findPosition(index){
        for(let i = 0; i < array.length; i++){
            if(+index === +array[i]) return i
        }
        throw new Error("Позицію не знайдено.")
    }

    function handleDragStart({ active }){
        setActive(active.id)
        console.log(active.id)
    }
    function handleDragOver({ active, over }){
        const activePosition = findPosition(active.id)
        const overPosition = findPosition(over.id)
        console.log(activePosition, overPosition, active1)
        let newArray = array
        if(active.id !== over.id) newArray = arrayMove([...array], activePosition, overPosition)
        setArray(newArray)
        console.log(newArray)
        localStorage.setItem("goals-list", newArray.join("^"))
    }
    function handleDragEnd(){
        setActive(undefined)
    }

    const activeKey = active1 === undefined ? null : `goals-item-${active1}`

    return (
        <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} sensors={sensors} modifiers={[restrictToWindowEdges]}>
            <div className="tlist__shell">
            <div className="tlist__header newblock">🌱 {isEn ? "My habits" : "Мої звички"}
            </div>
            <div className="glist tlist newblock">
                <div className="tlist__list glist__list">
                <SortableContext items={array} strategy={verticalListSortingStrategy}>
                    {array[0] === "" || array.length === 0 ?
                        <p className="error">{isEn ? "Unfortunately, there is nothing here!" : "Нажаль, тут нічого немає!"}</p>
                        : array.map((el, index) => {
                                if (index >= elementsOnPage * (page + 1) - elementsOnPage && index < elementsOnPage * (page + 1)) {
                                    return <GoalsItem key={`goals-item-${el}`} localKey={`goals-item-${el}`} setArray={setArray} active={active1} />
                                }
                            }
                        )}
                </SortableContext>
                </div>
                {pagesArray.length > 1 && <div className="tpages">
                    {pagesArray.map((el, index) => {
                        return <PagesButton key={index + el} page={page} num={index} onClick={() => setPage(index)} />
                    })}
                </div>}
            </div>
            </div>
            <DragOverlay>
                {active1 && <GoalsItem key={activeKey} localKey={activeKey} setArray={setArray} active={active1} isDraggable={true}/>}
            </DragOverlay>
        </DndContext>
    );
}

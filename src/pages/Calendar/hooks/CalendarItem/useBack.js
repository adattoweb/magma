import { useEffect } from "react"

export default function useBack(itemRef, rectItem, indexRef, indexPos, setIsTop, pos) { // хук який визначає сторону (верх або низ) елементу на якого наведено.
    useEffect(() => {
        const localRef = itemRef.current.getBoundingClientRect()
        rectItem.current = localRef
        if (indexRef.current === indexPos) { // якщо наведено на цей елемент
            // console.log(localRef.y + localRef.height / 2, pos.y, localRef.y, indexRef.current)
            setIsTop(pos.y < localRef.y + localRef.height / 2)
        }
    }, [pos])
}
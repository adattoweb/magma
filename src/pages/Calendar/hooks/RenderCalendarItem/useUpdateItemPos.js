import { useEffect } from "react"

export default function useUpdateItemPos(isDragging, setItemPos, pos, size) {
    useEffect(() => {
        if (isDragging) {
            setItemPos({
                x: pos.x - size.w / 2,
                y: pos.y - size.h / 2,
            })
        }
    }, [pos])
}
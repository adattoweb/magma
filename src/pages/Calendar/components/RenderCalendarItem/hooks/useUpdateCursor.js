import { useEffect } from "react";

export default function useUpdateCursor(isDragging, draggingCount, setDraggingCount) {
    useEffect(() => {
        if(isDragging) {
            document.body.style.cursor = "grabbing"
            setDraggingCount((prev) => prev + 1)
        } else {
            document.body.style.cursor = ""
            if (draggingCount > 0) setDraggingCount((prev) => prev - 1)
        }
    }, [isDragging]);
}
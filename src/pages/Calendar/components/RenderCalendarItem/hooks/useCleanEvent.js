import { useEffect } from "react";

export default function useCleanEvent(dragEnd) {
    useEffect(() => {
        window.addEventListener("mouseup", dragEnd);
        return () => window.removeEventListener("mouseup", dragEnd);
    }, [dragEnd]);
}
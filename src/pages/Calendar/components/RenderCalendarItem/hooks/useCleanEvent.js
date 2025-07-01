import { useEffect } from "react";

export default function useCleanEvent(dragEnd) {
    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        const eventType = isMobile ? "touchend" : "mouseup";
        window.addEventListener(eventType, dragEnd);
        return () => window.removeEventListener(eventType, dragEnd);
    }, [dragEnd]);
}
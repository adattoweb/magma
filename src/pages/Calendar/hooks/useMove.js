import { useEffect, useRef } from "react";
import throttle from "@/helpers//throttle";

export default function useMove(setPos, draggingCount){

    const rendersCount = useRef(0)
    
    const onMouseMove = useRef()
    const onTouchMove = useRef()

    useEffect(() => {
        onMouseMove.current = throttle((e) => {
          setPos({ x: e.clientX, y: e.clientY });
          console.log(`pos renders: ${++rendersCount.current}`);
        }, 10);
        onTouchMove.current = throttle((e) => {
            const touch = e.touches[0]
            setPos({x: touch.clientX, y: touch.clientY})
        }, 10)
    }, []);

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        if(draggingCount > 0){
            const handler = isMobile ? onTouchMove.current : onMouseMove.current;
            const eventType = isMobile ? "touchmove" : "mousemove";
            window.addEventListener(eventType, handler, { passive: false });
            return () => {
                window.removeEventListener(eventType, handler);
            };
        }
    }, [draggingCount])
}
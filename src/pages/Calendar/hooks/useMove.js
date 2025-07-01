import { useEffect, useRef } from "react";
import throttle from "@/helpers//throttle";

export default function useMove(setPos, draggingCount){

    const isMobile = window.innerWidth <= 768;

    let eventForDrag = 'mousemove';
    if(isMobile) eventForDrag = 'touchmove'

    const rendersCount = useRef(0)
    
    const onMouseMove = useRef()

    useEffect(() => {
        onMouseMove.current = throttle((e) => {
          setPos({ x: e.clientX, y: e.clientY });
          console.log(`pos renders: ${++rendersCount.current}`);
        }, 10);
    }, []);

    useEffect(() => {
        if(draggingCount > 0){
            window.addEventListener(eventForDrag, onMouseMove.current);
    
            return () => {
                window.removeEventListener(eventForDrag, onMouseMove.current);
            };
        }
    }, [draggingCount])
}
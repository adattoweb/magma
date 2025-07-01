import { useEffect, useRef } from "react";
import throttle from "@/helpers//throttle";

export default function useMove(setPos, draggingCount){

    const isMobile = window.innerWidth <= 768;

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
        if(draggingCount > 0){
            if(!isMobile){
                window.addEventListener("mousemove", onMouseMove.current);
    
                return () => {
                    window.removeEventListener("mousemove", onMouseMove.current);
                };
            } else {
                window.addEventListener("touchmove", onTouchMove.current);
    
                return () => {
                    window.removeEventListener("touchmove", onTouchMove.current);
                };
            }
        }
    }, [draggingCount])
}
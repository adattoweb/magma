import { useEffect } from "react";
import throttle from "../../../helpers/throttle";

export default function useMove(handleMouseMove, time, setPos){
    useEffect(() => {
        handleMouseMove.current = throttle((e) => {
            setPos({ x: e.clientX, y: e.clientY });
        }, time);
    }, [time]);

    useEffect(() => {
        const onMouseMove = (e) => {
            if (handleMouseMove.current) handleMouseMove.current(e);
        };
        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);
}
export default function useChangePos(isDragging, indexRef, indexPos){
    if(!isDragging) {
        indexRef.current = indexPos
    }
}
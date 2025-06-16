import { useEffect } from "react"

export default function useTimeManage(draggingCount, setTime) {
    useEffect(() => {
        if (draggingCount !== 0) setTime(10)
        else setTime(500)
    }, [draggingCount])
}
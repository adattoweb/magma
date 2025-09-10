import formatTime from "@/helpers/formatTime";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function AnalyticsItem({ local, allTime, maxHeight, uniqueColors }) {
    let [name, project, start, end, time] = local.split("^");

    // Уникаємо ділення на 0
    // let height = allTime > 0 ? +arr[4] / Math.max(1, Math.floor(allTime / maxHeight)) : 0;
    let height = allTime > 0 ? maxHeight / (allTime / +time) : 0;
    if (height < 1) return

    let color = "#000";
    for (let i = 0; i < uniqueColors.length; i++) {
        let arr = uniqueColors[i].split("^");
        if (arr[0] === name) {
            color = arr[1];
        }
    }
    const [isHovered, setIsHovered] = useState(false)
    return (
        <div className='aitem__color' style={{ backgroundColor: color, height: height + "px" }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <AnimatePresence mode="wait">
                {isHovered && <motion.div className="aitem__show" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p>{name}</p>
                    <p>{formatTime(time)}</p>
                </motion.div>}
            </AnimatePresence>
        </div>
    );
}
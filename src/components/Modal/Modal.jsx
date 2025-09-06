import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion"

import "./Modal.css"

export default function Modal({isOpen, onClose, children }){
    return createPortal(
      <AnimatePresence mode="wait">
        {isOpen && <motion.div key="overlay" initial={{background: "rgba(0,0,0,0.0)", backdropFilter: "blur(0px)"}} animate={{background: "rgba(0,0,0,0.5)", backdropFilter: "blur(1px)"}} exit={{background: "rgba(0,0,0,0.0)", backdropFilter: "blur(0px)"}} className="modal-overlay" onClick={onClose}>
          <motion.div className="modal" onClick={(e) => e.stopPropagation()} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} key="modal">
            {children}
          </motion.div>
        </motion.div>}
        </AnimatePresence>,
        document.getElementById("root")
      );
}
import { useState } from "react";
import triangleBlack from "../../../assets/triangleBlack.png";
import deleteImg from "../../../assets/delete.png";
import editImg from "../../../assets/edit.png";

export default function NoteBlock({ localKey, isRender, setIsRender }) {
    const valueArr = localStorage.getItem(localKey).split("@")
    const isEn = localStorage.getItem("settings-lang") === "en"; // визначення мови
    const [isOpen, setIsOpen] = useState(false);
    const [header, setHeader] = useState(valueArr[0]);
    const [text, setText] = useState(valueArr[1])
    const [isEdit, setIsEdit] = useState(false)
    if(!header.length) {
        setHeader(isEn ? "Without name" : "Без назви")
        editItem(isEn ? "Without name" : "Без назви")
    }


    function deleteItem() {
        localStorage.removeItem(localKey)
        setIsRender(!isRender);
    }

    function editItem(actualValue, numOfEdit) {
        if(numOfEdit === 1) localStorage.setItem(localKey, `${actualValue}@${text}`)
        if(numOfEdit === 2) localStorage.setItem(localKey, `${header}@${actualValue}`)
    }
    function MarkDown({ children }) {
        function MarkItem({ children }) {
            if (/^#{4}/.test(children)) return <h5>{children.replace(/^#{4}\s*/, "")}</h5>;
            if (/^#{3}/.test(children)) return <h4>{children.replace(/^#{3}\s*/, "")}</h4>;
            if (/^#{2}/.test(children)) return <h3>{children.replace(/^#{2}\s*/, "")}</h3>;
            if (/^#{1}/.test(children)) return <h2>{children.replace(/^#{1}\s*/, "")}</h2>;
          
            if (/^- /.test(children)) {
              return <li>{children.replace(/^- /, "")}</li>;
            }
          
            // Розбиття рядка на частини для розпізнавання форматування
            const parts = children.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g); // зберігає роздільники
          
            return (
              <p>
                {parts.map((part, index) => {
                  if (/^\*\*[^*]+\*\*$/.test(part)) {
                    return <b key={index}>{part.slice(2, -2)}</b>;
                  }
                  if (/^\*[^*]+\*$/.test(part)) {
                    return <i key={index}>{part.slice(1, -1)}</i>;
                  }
                  return <span key={index}>{part}</span>;
                })}
              </p>
            );
          }          
      
        return (
          <div className="markdown">
            {children.split("\n").map((line, index) => (
              <MarkItem key={index}>{line}</MarkItem>
            ))}
          </div>
        );
      }
      

    return (
        <div className="tblock">
            <div className="tblock__header">
                <div className="tblock__miniheader">
                    {<input type="text" onChange={(e) => {
                        setHeader(e.target.value);
                        editItem(e.target.value, 1);
                    }} value={header} />}
                    <img src={triangleBlack} onClick={() => {
                        setIsOpen(!isOpen);
                    }} className={isOpen ? "active" : ""} />
                </div>
                <div className="pblock__menu">
                    <img src={editImg} onClick={() => setIsEdit(!isEdit)} />
                    <img src={deleteImg} onClick={deleteItem} />
                </div>
            </div>
            {isOpen && <div className="tblock__list">
                {isEdit ? <textarea placeholder="Note" value={text} onChange={(e) => {
                    setText(e.target.value)
                    editItem(e.target.value, 2)
                }}/> :
                <MarkDown>{text}</MarkDown>}
            </div>}
        </div>
    );
}
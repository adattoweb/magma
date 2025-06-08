import rain from '../../../assets/rain.png'
import thunder from '../../../assets/thunder.png'
import wave from '../../../assets/wave.png'
import campfire from '../../../assets/campfire.png'
import wind from '../../../assets/wind.png'
import keyboard from '../../../assets/keyboard.png'
import train from '../../../assets/train.png'
import forest from '../../../assets/forest.png'
import river from '../../../assets/river.png'
import happySanta from '../../../assets/happy-santa.png';
import piano from '../../../assets/piano.png';
import snowAmbience from '../../../assets/snow-ambience.png';
import studyAmbience from '../../../assets/study-ambience.png';
import relaxing from '../../../assets/relaxing.png';
import nightingale from '../../../assets/nightingale.png';

import pause from '../../../assets/pause2.png'
import reset from '../../../assets/reset.png'
import start from '../../../assets/start.png'

import { useState } from "react"

export default function Audio({ children, array, setArray, isPause, setIsPause }) {
    console.log(array)
    const isEn = localStorage.getItem("settings-lang") === "en";
    function ModalItem({ name, img, alt, id }) {
        let isActive = array.some(el => el.id === id)
        const [localVolume, setLocalVolume] = useState(array.find(el => el.id === id)?.volume ?? 50)
        function changeArray(){
            setArray(array.map(el => {
                if (el.id === id) {
                    return { id, volume: +localVolume}
                }
                return el
            }))
        }
        return (
            <div className={isActive ? "audio__item active" : "audio__item"}>
                <div className="audio__parent" onClick={() => {
                    if (isActive) {
                        setArray(array.filter(el => el.id !== id))
                    }
                    else {
                        setArray([...array, { id, volume: +localVolume }])
                    }
                }}>
                    <img draggable={false} src={img} alt={alt} />
                    <p>{name}</p>
                </div>
                <input type="range" min="0" max="100" step="5" disabled={!isActive} value={localVolume} onChange={(e) => setLocalVolume(e.target.value)} onMouseUp={changeArray} onTouchEnd={changeArray} className="audio__range" />
            </div>
        )
    }
    const [isActive, setIsActive] = useState(false)
    const items = [
        ["Rain", rain],
        ["Rain 2", rain],
        ["Thunder", thunder],
        ["Wave", wave],
        ["Campfire", campfire],
        ["Wind", wind],
        ["Keyboard", keyboard],
        ["Train", train],
        ["Forest", forest],
        ["Forest 2", forest],
        ["River", river],
        ["Relaxing", relaxing],
        ["Relaxing 2", relaxing],
        ["Nightingale", nightingale],
        ["Study", studyAmbience],
        ["Santa", happySanta],
        ["Winter", snowAmbience],
        ["Piano", piano],
        ["Piano 2", piano],
        ["Piano 3", piano]
    ];

    return (
        <div className="audio">
            {isActive && <div className="audio__modal newblock">
                <div className="audio__header"><h3>{isEn ? "Sounds" : "Звуки"} <div className="audio__images"><img draggable={false} src={isPause ? start : pause} alt="pause" onClick={() => {
                    setIsPause(!isPause)

                }}/> <img src={reset} alt="reset audio" onClick={() => setArray([])} draggable={false}/></div></h3></div>
                <div className="audio__list">
                    {items.map((el, index) => {
                        return <ModalItem key={index} id={index} name={el[0]} alt={el[0]} img={el[1]} />
                    })}
                </div>
            </div>}
            <div className={isActive ? "mylink active" : "mylink"} onClick={() => setIsActive(!isActive)}>
                <p>{children}</p>
            </div>
        </div>
    )
}
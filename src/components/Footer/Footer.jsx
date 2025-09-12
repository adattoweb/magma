import './Footer.css';

import time from '@/assets/time.png'
import anal1 from '@/assets/anal1.png'
import home from '@/assets/home.png'
import goal from '@/assets/goal.png'
import settings from '@/assets/settings.png'
import calendar from '@/assets/calendar.png'
import audio from '@/assets/audio.png'
import fire from '@/assets/fire.png'

import rainSound from '@/assets/audio/rain.mp3';
import thunderSound from '@/assets/audio/thunder.mp3';
import waveSound from '@/assets/audio/wave.mp3';
import campfireSound from '@/assets/audio/campfire.mp3';
import windSound from '@/assets/audio/wind.mp3';
import keyboardSound from '@/assets/audio/keyboard.mp3';
import trainSound from '@/assets/audio/train.mp3';
import forestSound from '@/assets/audio/forest.mp3';
import forest2Sound from '@/assets/audio/forest2.mp3';
import relaxingSound from '@/assets/audio/relaxing.mp3';
import relaxing2Sound from '@/assets/audio/relaxing2.mp3';
import riverSound from '@/assets/audio/river.mp3';
import rain2Sound from '@/assets/audio/rain2.mp3';
import nightingaleSound from '@/assets/audio/nightingale.mp3';
import studyAmbienceSound from '@/assets/audio/study-ambience.mp3';
import happySantaSound from '@/assets/audio/happy-santa.mp3';
import snowAmbienceSound from '@/assets/audio/snow-ambience.mp3';
import pianoSound from '@/assets/audio/piano.mp3';
import piano2Sound from '@/assets/audio/piano2.mp3';
import piano3Sound from '@/assets/audio/piano3.mp3';


import Audio from './components/Audio';
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion"
export default function Footer() {
    const [isPause, setIsPause] = useState(false)

    let location = useLocation()
    let currentPath = location.pathname

    const [array, setArray] = useState([])
    const audioRefs = useRef([]);
    useEffect(() => {
        audioRefs.current.forEach((ref, index) => {
            if (!ref) return;
            array.map(el => {
                if(el.id === index) {
                    ref.volume = el.volume / 100
                }
            })
            if (array.some(el => el.id === index) && !isPause) {
                ref.play();
            }
            else {
                if(!isPause) ref.currentTime = 0;
                ref.pause()
            }
        });
    }, [array, isPause]);

    const sounds = [rainSound, rain2Sound, thunderSound, waveSound, campfireSound, windSound, keyboardSound, trainSound, forestSound, forest2Sound, riverSound, relaxingSound, relaxing2Sound, nightingaleSound, studyAmbienceSound, happySantaSound, snowAmbienceSound, pianoSound, piano2Sound, piano3Sound]

    function MyLink({to, children}){
        return (
            <div className={(currentPath.includes(to) && (currentPath !== "/" && to !== "/")) || (currentPath === "/" && to === "/") ? "mylink active" : "mylink"}>
                <Link to={to} draggable={false}>{children}</Link>
            </div>
        )
    }
    function Fire(){
        let lastDay = localStorage.getItem("fire-lastday")
        let fireValue = +localStorage.getItem("fire-value")
        if(!lastDay) {
            localStorage.setItem("fire-lastday", new Date().getTime())
            lastDay = new Date().getTime()
        }
        if(!fireValue) {
            localStorage.setItem("fire-value", "0")
            fireValue = 0
        }
        const now = new Date()
        let diff = Math.floor((now.getTime() - +lastDay) / 864000000)
        console.log(now.getTime() - 864000000)
        console.log(diff, now.getTime(), +lastDay, (now.getTime() - +lastDay) / 864000000)
        if(diff === 1){
            fireValue++;
            localStorage.setItem("fire-value", fireValue)
        } else if(diff > 1){
            fireValue = 0
            localStorage.setItem("fire-value", fireValue)
        }
        if(diff >= 1){
            localStorage.setItem("fire-lastday", new Date().getTime())
            console.log("+")
        }
        if(fireValue === 0) return
        return <div className="fire mylink"><img src={fire} alt="streak" /><p>{fireValue}</p></div>
    }
    return (
        <motion.div className='footer' initial={{opacity: 0}} animate={{opacity: 1}}>
            {sounds.map((el, index) => <audio key={index} ref={el => audioRefs.current[index] = el} src={el} preload="none" loop/>)}
            <div className="footer__left">
                <Audio array={array} setArray={(e) => setArray(e)} isPause={isPause} setIsPause={setIsPause}><img draggable={false} className="footer__img" src={audio} alt="audio" /></Audio>
            </div>
            <div className="footer__right">
                <Fire/>
                <div className="footer__union">
                    <MyLink to="/"><img className="footer__img" src={home} alt="home" draggable={false}/></MyLink>
                    <MyLink to="/trackers"><img className="footer__img" src={time} alt="trackers" draggable={false}/></MyLink>
                    <MyLink to="/calendar"><img className="footer__img" src={calendar} alt="calendar" draggable={false}/></MyLink>
                    <MyLink to="/analytics"><img className="footer__img" src={anal1} alt="analytics" draggable={false}/></MyLink>
                </div>
                <MyLink to="/goals"><img className="footer__img" src={goal} alt="goals" draggable={false}/></MyLink>
                {/* <MyLink to="/notebook"><img className="footer__img" src={notebook} alt="notebook" draggable={false}/></MyLink> */}
                <MyLink to="/settings"><img className="footer__img" src={settings} alt="settings" draggable={false}/></MyLink>
            </div>
        </motion.div>
    );
}

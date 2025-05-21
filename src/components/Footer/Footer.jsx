import './Footer.css';

import time from '../../assets/time.png'
import anal1 from '../../assets/anal1.png'
import home from '../../assets/home.png'
import notebook from '../../assets/notebook.png'
import goal from '../../assets/goal.png'
import settings from '../../assets/settings.png'
import calendar from '../../assets/calendar.png'
import audio from '../../assets/audio.png'

import rainSound from '../../assets/audio/rain.wav';
import thunderSound from '../../assets/audio/thunder.wav';
import waveSound from '../../assets/audio/wave.wav';
import campfireSound from '../../assets/audio/campfire.wav';
import windSound from '../../assets/audio/wind.wav';
import marchSound from '../../assets/audio/march.wav';
import keyboardSound from '../../assets/audio/keyboard.wav';
import trainSound from '../../assets/audio/train.wav';
import forestSound from '../../assets/audio/forest.wav';
import forest2Sound from '../../assets/audio/forest2.wav';
import riverSound from '../../assets/audio/river.wav';
import scarySound from '../../assets/audio/scary.wav';

import Audio from './components/Audio';
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
export default function Footer() {
    let location = useLocation()
    let currentPath = location.pathname;

    const [array, setArray] = useState([])
    const audioRefs = useRef([]);
    useEffect(() => {
        audioRefs.current.forEach((ref, index) => {
            if (!ref) return;
            array.map(el => {
                if(el.id === index) {
                    ref.volume = el.volume / 100
                    console.log(ref.volume)
                    console.log(el.volume)
                }
            })

            if (array.some(el => el.id === index)) {
                ref.play();
            } else {
                ref.pause();
                ref.currentTime = 0;
            }
        });
    }, [array]);

    const sounds = [rainSound, thunderSound, waveSound, campfireSound, windSound, marchSound, keyboardSound, trainSound, forestSound, forest2Sound, riverSound, scarySound]

    function MyLink({to, children}){
        return (
            <div className={currentPath === to ? "mylink active" : "mylink"}>
                <Link to={to}>{children}</Link>
            </div>
        )
    }
    return (
        <div className='footer'>
            {sounds.map((el, index) => <audio key={index} ref={el => audioRefs.current[index] = el} src={el} preload="auto" loop/>)}
            <div className="footer__left">
                <Audio array={array} setArray={(e) => setArray(e)}><img className="footer__img" src={audio} alt="audio" /></Audio>
            </div>
            <div className="footer__right">
                <div className="footer__union">
                    <MyLink to="/"><img className="footer__img" src={home} alt="home" /></MyLink>
                    <MyLink to="/trackers"><img className="footer__img" src={time} alt="trackers" /></MyLink>
                    <MyLink to="/calendar"><img className="footer__img" src={calendar} alt="calendar" /></MyLink>
                    <MyLink to="/analytics"><img className="footer__img" src={anal1} alt="analytics" /></MyLink>
                </div>
                <MyLink to="/goals"><img className="footer__img" src={goal} alt="goals" /></MyLink>
                <MyLink to="/notebook"><img className="footer__img" src={notebook} alt="notebook" /></MyLink>
                <MyLink to="/settings"><img className="footer__img" src={settings} alt="settings" /></MyLink>
            </div>
        </div>
    );
}

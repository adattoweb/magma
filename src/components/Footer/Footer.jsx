import './Footer.css';

import { Link, useLocation} from "react-router-dom";
import time from '../../assets/time.png'
import anal1 from '../../assets/anal1.png'
import home from '../../assets/home.png'
import info from '../../assets/info.png'
import notebook from '../../assets/notebook.png'
import goal from '../../assets/goal.png'
import settings from '../../assets/settings.png'
import calendar from '../../assets/calendar.png'

export default function Footer() {
    let location = useLocation()
    let currentPath = location.pathname;
    console.log(currentPath)

    function MyLink({to, children}){
        return (
            <div className={currentPath === to ? "mylink active" : "mylink"}>
                <Link to={to}>{children}</Link>
            </div>
        )
    }
    return (
        <div className='footer'>
            <div className="footer__left"></div>
            <div className="footer__right">
                <div className="footer__union">
                    <MyLink to="/"><img src={home} alt="home" /></MyLink>
                    <MyLink to="/trackers"><img src={time} alt="trackers" /></MyLink>
                    <MyLink to="/calendar"><img src={calendar} alt="calendar" /></MyLink>
                    <MyLink to="/analytics"><img src={anal1} alt="analytics" /></MyLink>
                </div>
                <MyLink to="/goalslist"><img src={goal} alt="goalslist" /></MyLink>
                <MyLink to="/help"><img src={info} alt="help" /></MyLink>
                <MyLink to="/notebook"><img src={notebook} alt="notebook" /></MyLink>
                <MyLink to="/settings"><img src={settings} alt="settings" /></MyLink>
            </div>
        </div>
    );
}

import { Link } from "react-router-dom";
import analytics from "../../../assets/analytics.png";
import projects from "../../../assets/projects.png";
import tracker from "../../../assets/tracker.png";

export default function Block1() {
    const isEn = localStorage.getItem("settings-lang") === "en";
    return (
        <div className="block1 newblock">
            <div className="block1__text">
                <h2>Magma</h2>
                <h3>Безкоштовний веб-трекер часу</h3>
                <p>Відслідковуйте скільки часу Ви витрачаєте на різні справи
                    будь то сон, робота, тощо.</p>
                <div className="block1__images">
                    <img src={tracker} />
                    <img src={projects} />
                    <img src={analytics} />
                </div>
            </div>
            <div className="block1__button"><Link to="/trackers">{isEn ? "Start" : "Почати"}</Link></div>
        </div>
    );
}
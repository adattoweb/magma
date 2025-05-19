import "./Page404.css";
import { Link } from "react-router-dom";

export default function PageNotFound() {
    const isEn = localStorage.getItem("settings-lang") === "en";
    return (
        <div className="page404 content">
            <div className="page404__block">
                <h1>404</h1>
                <p>{isEn ? "Page not found" : "Сторінка не знайдена."}</p>
                <Link to="/">{isEn ? "Go to main page" : "На головну"}</Link>
            </div>
        </div>
    );
}
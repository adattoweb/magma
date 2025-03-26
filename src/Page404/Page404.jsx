import "./Page404.css";
import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div className="page404 content">
            <h1>404</h1>
            <p>Сторінка не знайдена.</p>
            <Link to="/">На головну</Link>
        </div>
    );
}
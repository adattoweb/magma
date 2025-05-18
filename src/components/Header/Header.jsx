import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {

    return (
        <div className='header__logo'><Link to="/">Magma</Link></div>
    );
}

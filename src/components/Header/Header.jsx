import { Link } from "react-router-dom";
import quotes from "./helpers/quotes";
import "./Header.css";

import { useEffect, useState } from "react";

export default function Header() {
    if(!localStorage.getItem("magma-quotes")) localStorage.setItem("magma-quotes", "true")
    let isQuotesEnabled = localStorage.getItem("magma-quotes") === "true"
    const [rand, setRand] = useState(0)
    useEffect(() => {
        setRand(Math.floor(Math.random() * quotes.length))
    }, [])
    const isEn = localStorage.getItem("settings-lang") === "en";
    return (
        <div className="header">
            <div className='header__logo'><Link to="/">Magma</Link></div>
            {isQuotesEnabled && <div className="header__quote">«{isEn ? quotes[rand].en : quotes[rand].ua}»</div>}
        </div>
    );
}

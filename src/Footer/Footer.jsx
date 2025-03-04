import "./Footer.css";
import adattologo from '../assets/adattologo.png';

export default function Footer() {
    const isEn = localStorage.getItem("settings-lang") === "en"; // визначення мови

    return (
        <div className="footer">
            <img src={adattologo} alt="" className="footer__logo" />
            <div className="footer__text">
                <h2>{isEn ? "Magma LOCAL" : "Magma LOCAL"}</h2>
                <div className="footer__info">
                    <p>{isEn ? `Copyright © adattoweb ${new Date().getFullYear()}. All rights reserved.` : `Copyright © adattoweb ${new Date().getFullYear()}. Всі права захищені.`}</p>
                    <p>{isEn ? "In Telegram and Discord @adattoweb" : "У телеграмі і діскорді @adattoweb"}</p>
                </div>
            </div>
        </div>
    );
}

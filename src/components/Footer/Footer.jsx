import styles from './Footer.module.css';
import adattologo from "../../assets/adattologo.png";

export default function Footer() {
    const isEn = localStorage.getItem("settings-lang") === "en"; // визначення мови

    return (
        <div className={styles['footer']}>
            <img src={adattologo} alt="" className={styles['footer__logo']} />
            <div className={styles['footer__text']}>
                <h2>{isEn ? "Magma LOCAL" : "Magma LOCAL"}</h2>
                <div className={styles['footer__info']}>
                    <p>{isEn ? `Copyright © adattoweb ${new Date().getFullYear()}. All rights reserved.` : `Copyright © adattoweb ${new Date().getFullYear()}. Всі права захищені.`}</p>
                    <p>{isEn ? "In Telegram and Discord @adattoweb" : "У телеграмі і діскорді @adattoweb"}</p>
                </div>
            </div>
        </div>
    );
}

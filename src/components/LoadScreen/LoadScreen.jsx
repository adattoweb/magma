import styles from "./LoadScreen.module.css";

export default function LoadScreen() {
    return (
        <div className={styles['load-screen']}>
            <h2 className="tracking-in-contract">Magma</h2>
            <p className="tracking-in-contract">track your day</p>
        </div>
    );
}

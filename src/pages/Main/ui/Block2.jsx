import idea from "../../../assets/idea.png";
import local from "../../../assets/local.png";
import padlock from "../../../assets/padlock.png";

export default function Block2() {
    const isEn = localStorage.getItem("settings-lang") === "en";
function BlockItem({image, name, nameEn, text, textEn}){
    return (
        <div className="block2__item newblock">
            <img src={image}/>
            <h4>{isEn ? nameEn : name}</h4>
            <p>{isEn ? textEn : text}</p>
        </div>
    );
}
return (
    <div className="block2">
        <h1 className="newblock">{isEn ? "Our Advantages" : "Наші переваги"}</h1>
        <div className="block2__list">
            <BlockItem image={padlock} name="Локальне сховище" nameEn="Local Storage" text="Ми зберігаємо дані локально в Вашому браузері, тому ніхто їх не викраде" textEn="We store your data locally in your browser, so no one can steal it"/>
            <BlockItem image={local} name="Відкритий код" nameEn="Open Source" text="Кожний, хто бажає, може передивитися наш код на платформі GitHub" textEn="Anyone can view our code on GitHub"/>
            <BlockItem image={idea} name="Функціональність" nameEn="Functionality" text="Наша платформа дає можливість Вам слідкувати і аналізувати свій час" textEn="Our platform lets you track and analyze your time"/>
        </div>
    </div>
);
}
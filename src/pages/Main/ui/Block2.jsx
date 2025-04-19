import idea from "../../../assets/idea.png";
import local from "../../../assets/local.png";
import padlock from "../../../assets/padlock.png";

export default function Block2() {
    function BlockItem({image, name, children}){
        return (
            <div className="block2__item newblock">
                <img src={image}/>
                <h4>{name}</h4>
                <p>{children}</p>
            </div>
        );
    }
    return (
        <div className="block2">
            <h1>Наші переваги</h1>
            <div className="block2__list">
                <BlockItem image={padlock} name="Локальне сховище">Ми зберігаємо дані локально в Вашому браузері, тому ніхто їх не викраде</BlockItem>
                <BlockItem image={local} name="Відкритий код">Кожний, хто бажає, може передивитися наш код на платформі GitHub</BlockItem>
                <BlockItem image={idea} name="Функціональність">Наша платформа дає можливість Вам слідкувати і аналізувати свій час</BlockItem>
            </div>
        </div>
    );
}
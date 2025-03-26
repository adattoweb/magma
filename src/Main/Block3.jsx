import "./Main.css";

export default function Block3() {
    function BlockVersion({name, desc, plus, minus, price, isDeveloping, onMonth}){
        return (
            <a href="#" className="version">
                <h3>{name}</h3>
                <div className="version__text">
                    <h4>Опис</h4>
                    <p>{desc}</p>
                    {plus.length >= 1 && <h4>Переваги</h4>}
                    <ul>
                        {plus.map((el) => <li key={el}>{el}</li>)}
                    </ul>
                    {minus.length >= 1 && <h4>Недоліки</h4>}
                    <ul>
                        {minus.map((el) => <li key={el}>{el}</li>)}
                    </ul>
                </div>
                <div className="version__bottom">
                    <div className="version__button">{isDeveloping ? "В розробці" : "Почати"}</div>
                    <div className="version__price">{price}₴{onMonth && "/місяць"}</div>
                </div>
            </a>
        );
    }
    return (
        <div className="block3">
            <h1>Обирай свою версію</h1>
            <div className="block3__list">
                <BlockVersion
                    name="Magma Local" desc="Безкоштовна версія Magma, має свої переваги і недоліки"
                    plus={["Дані зберігаються локально в браузері за допомогою LocalStorage, тому НІХТО їх не викраде"]}
                    minus={["Не можна синхронізувати на різних пристроях"]}
                    price="0" isDeveloping={false} onMonth={false}
                />
                <BlockVersion
                    name="Magma Sync" desc="Платна версія Magma з синхронізацією, дешева"
                    plus={["Дані зберігаються локально в браузері за допомогою LocalStorage, тому НІХТО їх не викраде", "Можна синхронізувати дані на різних пристроях"]}
                    minus={[]}
                    price="10" isDeveloping={true} onMonth={true}
                />
                <BlockVersion
                    name="Magma Desktop" desc="Платна програма, яка слідкує за часом виконання усіх програм, можна також створювати власні трекери"
                    plus={["Можна відслідковувати час усіх програм", "Дані зберігаються локально", "МОЖЛИВО можна буде синхронізувати на різних пристроях"]}
                    minus={[]}
                    price="30" isDeveloping={true} onMonth={false}
                />
            </div>
        </div>
    );
}
export default function Block3() {
    const isEn = localStorage.getItem("settings-lang") === "en";

    function BlockVersion({name, desc, descEn, plus, plusEn, minus, minusEn, price, isDeveloping, onMonth}){
        return (
            <a href="#" className="version newblock">
                <h3>{name}</h3>
                <div className="version__text">
                    <h4>{isEn ? "Description" : "Опис"}</h4>
                    <p>{isEn ? descEn : desc}</p>
                    {plus.length >= 1 && <h4>{isEn ? "Advantages" : "Переваги"}</h4>}
                    <ul>
                        {(isEn ? plusEn : plus).map((el) => <li key={el}>{el}</li>)}
                    </ul>
                    {minus.length >= 1 && <h4>{isEn ? "Disadvantages" : "Недоліки"}</h4>}
                    <ul>
                        {(isEn ? minusEn : minus).map((el) => <li key={el}>{el}</li>)}
                    </ul>
                </div>
                <div className="version__bottom">
                    <div className="version__button">{isDeveloping ? (isEn ? "Later" : "В розробці") : (isEn ? "Start" : "Почати")}</div>
                    <div className="version__price">{price}₴{onMonth && (isEn ? "/month" : "/місяць")}</div>
                </div>
            </a>
        );
    }

    return (
        <div className="block3">
            <h1>{isEn ? "Choose your version" : "Обирай свою версію"}</h1>
            <div className="block3__list">
                <BlockVersion
                    name="Magma Local"
                    desc="Безкоштовна версія Magma, має свої переваги і недоліки"
                    descEn="Free version of Magma, with its pros and cons"
                    plus={["Дані зберігаються локально в браузері за допомогою LocalStorage, тому НІХТО їх не викраде"]}
                    plusEn={["Data is stored locally in your browser using LocalStorage, so NO ONE can steal it"]}
                    minus={["Не можна синхронізувати на різних пристроях"]}
                    minusEn={["Cannot be synced across different devices"]}
                    price="0" isDeveloping={false} onMonth={false}
                />
                <BlockVersion
                    name="Magma Sync"
                    desc="Платна версія Magma з синхронізацією, дешева"
                    descEn="Paid version of Magma with syncing, affordable"
                    plus={[
                        "Дані зберігаються локально в браузері за допомогою LocalStorage, тому НІХТО їх не викраде",
                        "Можна синхронізувати дані на різних пристроях"
                    ]}
                    plusEn={[
                        "Data is stored locally in your browser using LocalStorage, so NO ONE can steal it",
                        "Can sync data across different devices"
                    ]}
                    minus={[]} minusEn={[]} price="10" isDeveloping={true} onMonth={true}
                />
                <BlockVersion
                    name="Magma Desktop"
                    desc="Платна програма, яка слідкує за часом виконання усіх програм, можна також створювати власні трекери"
                    descEn="Paid desktop app that tracks all program usage time, and allows creating custom trackers"
                    plus={[
                        "Можна відслідковувати час усіх програм",
                        "Дані зберігаються локально",
                        "МОЖЛИВО можна буде синхронізувати на різних пристроях"
                    ]}
                    plusEn={[
                        "Can track time of all programs",
                        "Data is stored locally",
                        "MAYBE will support cross-device sync"
                    ]}
                    minus={[]} minusEn={[]} price="30" isDeveloping={true} onMonth={false}
                />
            </div>
        </div>
    );
}

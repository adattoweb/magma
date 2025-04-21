import star from "../../../assets/nonstar1.png";
import nonstar from "../../../assets/nonstar.png";


export default function Block4() {
    const isEn = localStorage.getItem("settings-lang") === "en";

    function ReviewItem({ header, text, textEn, stars, author }) {
        const arr = [];
        for (let i = 0; i < 5; i++) {
            arr.push(i < stars);
        }
        return (
            <div className="review newblock">
                <h3>{header} <div className="stars">{arr.map((el, index) => el ? <img key={index} src={star} /> : <img key={index} src={nonstar} />)}</div></h3>
                <p>{isEn ? textEn : text}</p>
                <p className="review__author">{author}</p>
            </div>
        );
    }

    return (
        <div className="block4">
            <h1>{isEn ? "Reviews" : "Відгуки"}</h1>
            <div className="block4__list">
                <ReviewItem header={isEn ? "Great experience" : "Чудовий досвід"} 
                            text="Як головний і єдиний розробник, рекомендую Atempus. Звичайно, в нього є і свої мінуси, але я буду його покращувати." 
                            textEn="As the sole developer, I recommend Atempus. Of course, it has its flaws, but I will continue to improve it." 
                            stars={5} author="adattoweb" />
                <ReviewItem header={isEn ? "Great experience" : "Чудовий досвід"} 
                            text="Як головний і єдиний розробник, рекомендую продукт. Є деякі недоліки, але я працюю над їх усуненням." 
                            textEn="As the only developer, I recommend the product. There are some downsides, but I’m working on fixing them." 
                            stars={4} author="adattoweb" />
                <ReviewItem header={isEn ? "Great experience" : "Чудовий досвід"} 
                            text="Платформа має потенціал, навіть якщо ще є над чим працювати." 
                            textEn="The platform has potential, even if there’s still work to do." 
                            stars={4} author="adattoweb" />
                <ReviewItem header={isEn ? "Great experience" : "Чудовий досвід"} 
                            text="Мені подобається ідея, і я бачу велику перспективу." 
                            textEn="I like the idea, and I see great potential." 
                            stars={4} author="adattoweb" />
                <ReviewItem header={isEn ? "Great experience" : "Чудовий досвід"} 
                            text="Розвивається, є над чим працювати, але вже зараз корисно." 
                            textEn="Still developing, there’s room for improvement, but it’s already useful." 
                            stars={4} author="adattoweb" />
                <ReviewItem header={isEn ? "Great experience" : "Чудовий досвід"} 
                            text="Якщо ви шукаєте простий трекер часу — спробуйте!" 
                            textEn="If you’re looking for a simple time tracker — give it a try!" 
                            stars={4} author="adattoweb" />
                <ReviewItem header={isEn ? "Great experience" : "Чудовий досвід"} 
                            text="Гарна робота, видно, що зроблено з душею." 
                            textEn="Nice work, you can see it was made with care." 
                            stars={4} author="adattoweb" />
                <ReviewItem header={isEn ? "Great experience" : "Чудовий досвід"} 
                            text="Чудово для особистого користування, не потрібно нічого налаштовувати." 
                            textEn="Great for personal use, nothing needs to be set up." 
                            stars={4} author="adattoweb" />
                <ReviewItem header={isEn ? "Great experience" : "Чудовий досвід"} 
                            text="Все зберігається локально — це топ!" 
                            textEn="Everything is saved locally — that’s awesome!" 
                            stars={4} author="adattoweb" />
                <ReviewItem header={isEn ? "Great experience" : "Чудовий досвід"} 
                            text="Рекомендую. Проста, легка у використанні штука." 
                            textEn="Recommended. Simple and easy to use." 
                            stars={4} author="adattoweb" />
            </div>
        </div>
    );
}

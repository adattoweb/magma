import star from "../../../assets/nonstar1.png";
import nonstar from "../../../assets/nonstar.png";


export default function Block4() {

    function ReviewItem({ header, text, stars, author }) {
        const arr = [];
        for (let i = 0; i < 5; i++) {
            arr.push(i < stars);
        }
        return (
            <div className="review">
                <h3>{header} <div className="stars">{arr.map((el, index) => el ? <img key={index} src={star} /> : <img key={index} src={nonstar} />)}</div></h3>
                <p>{text}</p>
                <p className="review__author">{author}</p>
            </div>
        );
    }

    return (
        <div className="block4">
            <h1>Відгуки</h1>
            <div className="block4__list">
                <ReviewItem header="Чудовий досвід" text="Як головний і єдиний розо є і свої мінуси, але я буду його покращувати."
                    stars={5} author="adattoweb" />
                <ReviewItem header="Чудовий досвід" text="Як головний і єдиний розробник, рекомендую нього є і свої мінуси, але я буду його покращувати."
                    stars={4} author="adattoweb" />
                <ReviewItem header="Чудовий досвід" text="Як головний і єдиний розробник, рекомендую Atempus для викори є і свої мінуси, але я буду його покращувати."
                    stars={4} author="adattoweb" />
                <ReviewItem header="Чудовий досвід" text="Як головний і єдиний розробник, рекомендую Atempus для використання. Звичайно в нього є і свої мінуси, але я буду його покращувати."
                    stars={4} author="adattoweb" />
                <ReviewItem header="Чудовий досвід" text="Як головно є і свої мінуси, але я буду його покращувати."
                    stars={4} author="adattoweb" />
                <ReviewItem header="Чудовий досвід" text="Як головний і єдиний розробник, рекомендую Atemої мінуси, але я буду його покращувати."
                    stars={4} author="adattoweb" />
                <ReviewItem header="Чудовий досвід" text="Як головний і єдиний розробник, рЗвичайно в нього є і свої мінуси, але я буду його покращувати."
                    stars={4} author="adattoweb" />
                <ReviewItem header="Чудовий досвід" text="Як головний і єдиний розробник, рекомендую Atempus дл в нього є і свої мінуси, але я буду його покращувати."
                    stars={4} author="adattoweb" />
                <ReviewItem header="Чудовий досвід" text="Як головний і єдиний розро але я буду його покращувати."
                    stars={4} author="adattoweb" />
                <ReviewItem header="Чудовий досвід" text="Як головний і єдиний розро але я буду його покращувати."
                    stars={4} author="adattoweb" />
            </div>
        </div>
    );
}
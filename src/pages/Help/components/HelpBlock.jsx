export default function HelpBlock({ title, children }){
    return (
        <div className="helpblock">
            <h3>{title}</h3>
            <p>{children}</p>
        </div>
    )
}
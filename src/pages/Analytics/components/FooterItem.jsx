export default function FooterItem({ name, color }) {
    return (
        <div className='fitem'>
            <div className='fitem__color' style={{ backgroundColor: color }}></div>
            <p className='fitem__name'>{name}</p>
        </div>
    );        
}
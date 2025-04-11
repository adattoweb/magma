export default function FooterItem({ str }) {
    console.log("Footer item render")
    let arr = str.split("@");
    return (
        <div className='fitem'>
            <div className='fitem__color' style={{ backgroundColor: arr[1] }}></div>
            <p className='fitem__name'>{arr[0]}</p>
        </div>
    );        
}
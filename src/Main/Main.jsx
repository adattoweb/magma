import "./Main.css"
import Block1 from './Block1'
import Block2 from './Block2'
import Block3 from './Block3'
import Block4 from './Block4'
export default function Main(){

    return (
        <div className="main content">
            <Block1/>
            <Block2/>
            {/* <Block3/> */}
            <Block4/>
        </div>
    )
}
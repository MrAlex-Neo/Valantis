import './style.css'

import img from './arrow.svg'
const Arrow = (props) => {
    const {data} = props
    return(
        <div className='arrow' data-index={data}><button type="button"><img src={img} alt="" /></button></div>
    )
}

export default Arrow
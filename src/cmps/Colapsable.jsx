
import { useState } from 'react'

export function Colapsable({ title, children }) {
    const [isOpen, setIsOpen] = useState(false)

    function toggleOpen() {
        setIsOpen(!isOpen)
    }
    const style = { display: "flex", alignItems: "center", cursor: "pointer", overflow: 'hidden' }
    const arrowStyle = { marginLeft: '10px', transform: isOpen ? 'rotate(270deg)' : 'rotate(90deg)' , transition: 'transform 0.5s ease' }

    return (
        <section className="colapsable">
            <div className='header' onClick={toggleOpen} style={style}>{title}<span style={arrowStyle}>»</span></div>
            {isOpen && <div className="content">{children}</div>}
        </section>
    )
}
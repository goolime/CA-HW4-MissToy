
export function Tooltip({onClick=()=>{} ,children ,tooltip}){
    return <div className="tooltip" onClick={onClick} >
        {children}
        <span className="tooltiptext">{tooltip}</span>
    </div>
}
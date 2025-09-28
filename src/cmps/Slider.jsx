

export function Slider({name=null, isChecked, onChange, id='1'}){
    return (
        <label className="switch">
            <input id={id} type="checkbox" name={name} checked={isChecked} onChange={onChange} />
            <span className="slider round"></span>
        </label>
    )
}
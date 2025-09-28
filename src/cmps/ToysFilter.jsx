import { useState } from "react"
import { Colapsable } from "./Colapsable";
import { Tooltip } from "./Tooltip";
import { Slider } from "./slider";
import { toysService } from "../services/toys.service";

export function ToysFilter({ onSetFilterBy , filterBy }){
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    
    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
            default:
                break;
        }

        if(field==='minPrice' && filterByToEdit.maxPrice<value) return
        if(field==='maxPrice' && filterByToEdit.minPrice>value) return

        setFilterByToEdit((filter) => ({ ...filter, [field]: value }))
        onSetFilterBy({...filterByToEdit, [field]: value})
    }

    function handleLabelChange({target}){
        const value = target.name
        const isAdded = target.checked

        const newLabels= isAdded? [...filterByToEdit.labels,value] : filterByToEdit.labels.filter(label=>label!==value)

        setFilterByToEdit(oldFilterBy=>({...oldFilterBy,labels:newLabels}))
        onSetFilterBy({...filterByToEdit, labels: newLabels})
    }



    const labels= toysService.getLabels()

    return <>
        <Colapsable title={
            <h2>Filter</h2>
        } >
            <form className="toys-filter">
                <section className="filter">
                <h3 htmlFor="name">Name:</h3>
                <input type="text" id="name" name="name" value={filterByToEdit.name} onChange={handleChange} />
                <Tooltip tooltip={`Change to case ${!filterByToEdit.caseSensitive?'sensitive':'insensitive'}`}>
                    <Slider name='caseSensitive' isChecked={filterByToEdit.caseSensitive} onChange={handleChange} id='caseSensitive'/>
                </Tooltip>
                </section>
                <section className="filter">
                <h3>Price:</h3>
                <h3>Max:</h3><input type="number" name="maxPrice" value={filterByToEdit.maxPrice} onChange={handleChange} />
                <h3>Min:</h3><input type="number" name="minPrice" value={filterByToEdit.minPrice} onChange={handleChange} />
                </section>
                <section className="filter">
                <h3>In stock:</h3>
                <select name="inStock" value={filterByToEdit.inStock} onChange={handleChange}>
                    <option value={undefined}>All</option>
                    <option value={true}>In stock</option>
                    <option value={false}>Out of stock</option>
                </select>
                </section>
                <section className="filter labels-filter">
                <h3>Labels:</h3>
                <div className="labels">
                    { filterBy.labels && labels.map(label=>
                        <div key={label} className="label">
                            <Slider name={label} isChecked={filterByToEdit.labels.indexOf(label) !== -1} onChange={handleLabelChange} id={label}/>
                            <h4 htmlFor={label}>{label}</h4>
                        </div>
                    )}
                </div>  
                </section>
            </form>
        </Colapsable>
    </>
}
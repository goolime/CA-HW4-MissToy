import { Link } from "react-router"
import { Tooltip } from "./Tooltip"

export function ToysOrderBy({ onSetOrderBy }) {

    
    function handleChange(ev) {
        const [field, direction] = ev.target.value.split(',')
        onSetOrderBy({ field, direction: +direction })
    }

    return <>
        <div className="toys-order-by">
            <div className="order-by-select">
                <h3 htmlFor="order-by">Sort by:</h3>
                <select name="order-by" id="order-by" onChange={handleChange}>
                    <option value="name,1">Name - ascending</option>
                    <option value="name,-1">Name - descending</option>
                    <option value="price,1">Price - ascending</option>
                    <option value="price,-1">Price - descending</option>
                    <option value="createdAt,1">Created At - ascending</option>
                    <option value="createdAt,-1">Created At - descending</option>
                </select>
            </div>
            <Tooltip tooltip="Add">
                <Link to="/toys/add" className="add-toy-btn">
                    <img src="https://img.icons8.com/ios/50/plus--v1.png" alt="Add"/>
                </Link> 
            </Tooltip>
        </div>
    </>
}
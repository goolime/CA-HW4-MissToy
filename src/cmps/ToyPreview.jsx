import { Link } from "react-router"
import { removeToy } from "../store/toys/toys.actions.js"
import { Tooltip } from "./Tooltip.jsx"
import { showInteraction } from "../services/event-bus.service.js"


export function ToyPreview({toy}){

    function ondelete(ev){
        ev.preventDefault()
        showInteraction({
            txt:`Are you sure you wants to delete '${toy.name}'?`,
            type:'',
            buttons:[
                {
                    txt: 'Delete',
                    onClick:()=>removeToy(toy._id)
                },
                {
                    txt: 'Cancle',
                    onClick: ()=>{}
                }
            ]
        })
    }
    
    const lastUpdateString = getLastUpdateString(toy.updatedAt)

    return <div className="toy-preview">
        <h3>{toy.name}</h3>
        <h5>Last update:{lastUpdateString}</h5>
        <div className="toy-preview-actions">
            <Tooltip tooltip='Delete'>
                <img onClick={ondelete} src="https://img.icons8.com/material-outlined/96/trash--v1.png" alt="Delete"/>
            </Tooltip>
            <Tooltip tooltip='Details'>
                <Link to={`/toys/${toy._id}`}>
                    <img src="https://img.icons8.com/material-outlined/96/document--v1.png" alt="Details"/>
                </Link>
            </Tooltip>
            <Tooltip tooltip='Edit'>
                <Link to={`/toys/edit/${toy._id}`}>
                    <img src="https://img.icons8.com/material-outlined/96/edit--v1.png" alt="Edit"/>
                </Link>
            </Tooltip>
        </div>
    </div>
}

function getLastUpdateString(date){
    const diff = Date.now()-date
    const seconds = Math.floor(diff/1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days>1) return `${days} days ago`
    else if (days===1) return 'Yesterday'
    else if (hours >= 1) return `${hours} hours ago`
    else if (minutes> 2) return  `${minutes} minutes ago`
    else return 'Now'
}
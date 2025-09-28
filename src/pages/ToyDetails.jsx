import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { toysService } from "../services/toys.service"
import { Loading } from "../cmps/Loading.jsx"
import { Link } from "react-router"
import { Tooltip } from "../cmps/Tooltip.jsx"

export function ToyDetails(){

    const [toy,setToy] = useState(null)
    const params = useParams()

    useEffect(()=>{
        loadToy()
    },[params.toyId])

    async function loadToy(){
        try{
            setToy(await toysService.get(params.toyId))
        }
        catch(err){
            console.log('Error loading Toy:',err)
        }
    }

    if(!toy) return <Loading />
    const {name, price, labels, createdAt, updatedAt, inStock} = toy
    const createdAtString= getTimeString(createdAt)
    const updatedAtString= getTimeString(updatedAt)
    return <>
        <div className="toy-details">
            <div className="toy-details-navigation prev">
                <Tooltip tooltip={toy.prevToy.name}>
                    <Link to={`/toys/${toy.prevToy._id}`}>
                        <img src="https://img.icons8.com/ios/50/circled-chevron-left.png" alt="Previous"/>
                    </Link>
                </Tooltip>
            </div>
            <div className="toy-details-data">
                <h2>{name}</h2>
                <h3>Price: {price}$</h3>
                <div className="labels">
                    { labels.map(label=><div key={label} className="label"><h5>{label}</h5></div>) }
                </div>
                <h3>Created: {createdAtString}</h3>
                <h3>Last update: {updatedAtString}</h3>
                <h3>In stock: {inStock? 'Yes' : 'No' }</h3>
            </div>
            <div className="toy-details-navigation next">
                <Tooltip tooltip={toy.nextToy.name}>
                    <Link to={`/toys/${toy.nextToy._id}`}>
                        <img src="https://img.icons8.com/ios/50/circled-chevron-right--v1.png" alt="Next"/>
                    </Link>
                </Tooltip>
            </div>
        </div>

    </>
}

function getTimeString(time){
    const date=new Date(time)
    return date.toLocaleString()
}
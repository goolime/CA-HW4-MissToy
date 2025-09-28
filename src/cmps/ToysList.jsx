import { useSelector } from "react-redux"
import {ToyPreview} from './ToyPreview.jsx'

export function ToysList({toys}){

    const orderBy = useSelector(storeState => storeState.toysModule.orderBy)

    return <>
        <div hidden={true}>{orderBy.field} - {orderBy.direction === 1 ? 'ascending' : 'descending'}</div>
        <div className="toys-list">
            {toys.map(toy=><ToyPreview key={toy._id} toy={toy} /> )}
        </div>
    </>
}
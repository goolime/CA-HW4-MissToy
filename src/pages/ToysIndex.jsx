import { useEffect } from "react"
import { loadToys, setFilterBy, setOrderBy } from "../store/toys/toys.actions.js"
import { useSearchParams } from "react-router"
import { useSelector } from "react-redux"
import { toysService } from "../services/toys.service.js"
import { getExistingProperties, debounce } from '../services/util.service.js'
import { ToysOrderBy } from '../cmps/ToysOrderBy.jsx'
import { ToysFilter } from '../cmps/ToysFilter.jsx'
import { ToysList } from '../cmps/ToysList.jsx'

export function ToysIndex(){
    const [searchParams,setSearchParams] = useSearchParams()
    const toys= useSelector(storeState => storeState.toysModule.toys)
    const filterby = useSelector(storeState => storeState.toysModule.filterBy)

    useEffect(()=>{
        toysService.getFilterFromSearchParams(searchParams).then(filter => {
            setFilterBy(filter)
        })
    },[])

    useEffect(()=>{
        loadToys()
        setSearchParams(getExistingProperties(filterby))
    },[filterby])

    function onSetFilterBy(filterBy) {
        setFilterBy(filterBy)
        setSearchParams(getExistingProperties(filterBy))
        loadToys()
    }

    async function onSetOrderBy(orderBy) {
        await setOrderBy(orderBy)
        loadToys()
    }

    if (!toys) return <h1>LOADING...</h1>
    return  <>
        <section className="toys-index">
            <div className="toys-index-header">
                <ToysFilter onSetFilterBy={debounce(onSetFilterBy, 1000)} filterBy={filterby} />
                <ToysOrderBy onSetOrderBy={debounce(onSetOrderBy, 300)}/>
            </div>
            <ToysList toys={toys} />

        </section>
    </>
}
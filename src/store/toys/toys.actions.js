import { toysService } from "../../services/toys.service.js";
import { store } from "../store.js";
import { SET_TOYS, REMOVE_TOY, EDIT_TOY , ADD_TOY , SET_FILTER } from './toys.reducer.js'

export async function loadToys(){
    try {
        const filterBy = store.getState().toysModule.filterBy
        store.dispatch({type: SET_TOYS, toys: await toysService.query(filterBy)})
    }
    catch(err){
        console.log('having issue with loading toys:', err )
        throw err
    }
}

export async function removeToy(toyId){
    try{
        store.dispatch({type:REMOVE_TOY, toyId: await toysService.remove(toyId)})
    }
    catch(err){
        console.log('having issue with renoving a toy:', err )
        throw err
    }
}

export async function saveToy(toyToSave){
    try{
        const type= toyToSave._id ? EDIT_TOY : ADD_TOY
        store.dispatch({type,toy:await toysService.save(toyToSave)})
    }
    catch(err){
        console.log('having issue with saving a toy:', err )
        throw err
    }
}

export async function setFilterBy(filterBy){
    try{
        store.dispatch({ type: SET_FILTER, filterBy })
    }
    catch(err){
        console.log('having issue with setting the filter:', err )
        throw err
    }
}
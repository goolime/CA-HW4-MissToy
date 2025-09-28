import { toysService } from "../../services/toys.service"

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY ='REMOVE_TOY'
export const EDIT_TOY = 'EDIT_TOY'
export const ADD_TOY = 'ADD_TOY'
export const SET_FILTER = 'SET_FILTER'
export const SET_ORDER = 'SET_ORDER'
export const SET_LOADING = 'SET_LOADING'

const initialState={
    toys:null,
    filterBy:toysService.getDefaultFilter(),
    orderBy:{type:'name',direction:1},
    isLoading:false
}

export function toysReducer(state=initialState,cmd){
    switch(cmd.type){
        case SET_TOYS:
            return {
                ...state,
                toys: cmd.toys
            }
        case REMOVE_TOY:
            return {
                ...state,
                toys: state.toys.filter(toy=>toy._id!==cmd.toyId)
            }
        case EDIT_TOY:
            return {
                ...state,
                toys: state.toys.map(toy=> toy._id===cmd.toy._id ? cmd.toy : toy)
            }
        case ADD_TOY:
            return {
                ...state,
                toys:[...state.toys, cmd.toy]
            }
        case SET_FILTER:
            return {
                ...state,
                filterBy: cmd.filterBy
            }
        case SET_ORDER:
            return {
                ...state,
                orderBy: cmd.orderBy
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        default:
            return state
    }
}
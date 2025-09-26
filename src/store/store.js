
import { createStore, combineReducers, compose } from 'redux'
import { toysReducer } from './toys/toys.reducer.js'

//const { createStore, combineReducers, compose } = Redux

const rootReducer = combineReducers({
    toysModule:toysReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())
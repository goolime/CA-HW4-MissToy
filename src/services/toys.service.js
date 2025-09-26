import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TOYS_KEY = 'toysDB'
_createToys()
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'] 

export const toysService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    getLabels
}
// For Debug (easy access from console):
window.cs = toysService

function query(filterBy = {}) {
    return storageService.query(TOYS_KEY)
        .then(todos => {

            /// TODO: add filter

            return todos
        })
}


function get(toyId) {
    return storageService.get(TOYS_KEY, toyId)
        .then(toy => {
            toy = _setNextPrevToyId(toy)
            return toy
        })
}

function remove(toyId) {
    return storageService.remove(TOYS_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        // TODO - updatable fields
        toy.updatedAt = Date.now()
        return storageService.put(TOYS_KEY, toy)
    } else {
        toy.createdAt = toy.updatedAt = Date.now()

        return storageService.post(TOYS_KEY, toy)
    }
}

function getEmptyToy(name = '', price = 10 ,labels= [] ,inStock= true ) {
    return { name, price, labels, inStock }
}

function getDefaultFilter() {
    return { 
        /// TODO: add filter
    }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

function getLabels(){
    return [...labels]
}

function _createToys() {
    let toys = utilService.loadFromStorage(TOYS_KEY)
    if (!toys || !toys.length) {
        toys = []
        const txts = ['Lego', 'Playmobil', 'Barbie' , 'Nerf','Hot Wheels']
        for (let i = 0; i < 20; i++) {
            const name = txts[utilService.getRandomIntInclusive(0, txts.length - 1)]
            toys.push(_createToy(name + (i + 1), utilService.getRandomIntInclusive(1, 10), _getRandomLabels(), Math.random() > 0.3))
        }
        utilService.saveToStorage(TOYS_KEY, toys)
    }
}

function _getRandomLabels(){
    const arr=[...labels]
    const labelsToRemove=Math.floor(arr.length/2+Math.random()*arr.length/2)
    for(let i=0; i<labelsToRemove; i++){
        arr.splice(Math.floor(Math.random*arr.length),1)
    }
}

function _createToy(name , price ,labels ,inStock ) {
    const todo = getEmptyToy(name , price ,labels ,inStock)
    todo._id = utilService.makeId()
    todo.createdAt = todo.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return todo
}

function _setNextPrevToyId(todo) {
    return storageService.query(TOYS_KEY).then((todos) => {
        const todoIdx = todos.findIndex((currTodo) => currTodo._id === todo._id)
        const nextTodo = todos[todoIdx + 1] ? todos[todoIdx + 1] : todos[0]
        const prevTodo = todos[todoIdx - 1] ? todos[todoIdx - 1] : todos[todos.length - 1]
        todo.nextTodoId = nextTodo._id
        todo.prevTodoId = prevTodo._id
        return todo
    })
}

// Data Model:
// const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'] 
// const toy = { 
//      _id: 't101', 
//      name: 'Talking Doll', 
//      price: 123, 
//      labels: ['Doll', 'Battery Powered', 'Baby'],
//      createdAt: 1631031801011, 
//      inStock: true,
// }


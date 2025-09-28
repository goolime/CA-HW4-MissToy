import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TOYS_KEY = 'toysDB'
_createToys()



export const toysService = {
    query,
    get,
    remove,
    save,
    getById,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    getLabels
}
// For Debug (easy access from console):
window.cs = toysService

function query(filterBy,orderBy = { field: 'name', direction: 1 }) {
    return storageService.query(TOYS_KEY)
        .then(toys => {

            if (!filterBy) return toys
            
            if (filterBy.inStock !== undefined && filterBy.inStock !== 'All') {
                toys = toys.filter(toy=> {
                    if (filterBy.inStock === 'true') return toy.inStock
                    return !toy.inStock
                })
            }
            //console.log(toys)
            if( filterBy.name && filterBy.caseSensitive!==undefined){
                let { name, caseSensitive } = filterBy
                toys = toys.filter(toy =>{
                    return caseSensitive ? toy.name.includes(name) : toy.name.toLowerCase().includes(name.toLowerCase()) && 
                           (filterBy.inStock === undefined || toy.inStock === filterBy.inStock) 
                })
            }
            //console.log(toys)
            if( filterBy.labels && filterBy.labels.length){
                toys = toys.filter(toy=>{
                    return filterBy.labels.every(label=>toy.labels.includes(label))
                })
            }
            //console.log(toys)

            if (filterBy.maxPrice !== undefined){
                toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
            }
            //console.log(toys)
            if (filterBy.minPrice !== undefined){
                toys = toys.filter(toy => toy.price >= filterBy.minPrice)
            }
            //console.log(toys)

            toys.sort((a, b) => {
                const { field, direction } = orderBy
                if (a[field] < b[field]) return -1 * direction
                if (a[field] > b[field]) return 1 * direction
                return 0
            })
            return toys
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

async function getDefaultFilter() {
    const maxPrice = (await query()).reduce((acc, toy) => {
        acc = Math.max(acc, toy.price)
        return acc
    }, 0)

    return { 
        name: '',
        caseSensitive: false,
        maxPrice: maxPrice,
        minPrice: 0,
        inStock: undefined,
        labels: []
    }
}

async function getFilterFromSearchParams(searchParams) {
    const defaultFilter = await getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }
    if(filterBy.caseSensitive){
        if(filterBy.caseSensitive==='true') filterBy.caseSensitive=true
        else filterBy.caseSensitive=false
    }
    return filterBy
}

async function getById(id) {
    return await storageService.get(TOYS_KEY, id)
}

function getLabels(){
    return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'] 
}

function _createToys() {
    let toys = utilService.loadFromStorage(TOYS_KEY)
    if (!toys || !toys.length) {
        toys = []
        const txts = ['Lego', 'Playmobil', 'Barbie' , 'Nerf','Hot Wheels']
        for (let i = 0; i < 20; i++) {
            const name = txts[utilService.getRandomIntInclusive(0, txts.length - 1)]
            toys.push(_createToy(name + '-' + (i + 1), utilService.getRandomIntInclusive(1, 300), _getRandomLabels(), Math.random() > 0.3))
        }
        utilService.saveToStorage(TOYS_KEY, toys)
    }
}

function _getRandomLabels(){
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'] 
    const labelsToRemove=Math.floor((labels.length/2)+(Math.random()*(labels.length/2)))
    for(let i=0; i<labelsToRemove; i++){
        const idx=Math.floor(Math.random()*labels.length)
        labels.splice(idx,1)
    }
    return labels
}

function _createToy(name , price ,labels ,inStock ) {
    const toy = getEmptyToy(name , price ,labels ,inStock)
    toy._id = utilService.makeId()
    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return toy
}

function _setNextPrevToyId(toy) {
    return storageService.query(TOYS_KEY).then((toys) => {
        const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
        const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
        const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
        toy.nextToy = {_id:nextToy._id,name:nextToy.name}
        toy.prevToy = {_id:prevToy._id,name:prevToy.name}
        return toy
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
//      updatedAt: 1631031901011
//      inStock: true,
// }


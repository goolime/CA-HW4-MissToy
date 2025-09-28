import { useEffect, useRef, useState } from "react"
import { useParams,  } from "react-router"
import { useNavigate } from 'react-router-dom'
import { toysService } from "../services/toys.service"
import { showInteraction } from "../services/event-bus.service"
import { saveToy, setLoading } from "../store/toys/toys.actions"
import { Loading } from "../cmps/Loading.jsx"
import { ToggleComponent } from "../cmps/ToggleComponent.jsx"
import { Slider } from "../cmps/slider.jsx"
import { useSelector } from "react-redux"


export function ToyEdit(){
    const currentToy=useRef(null)
    const [toyToEdit,setToyToEdit] = useState(null)
    const navigate = useNavigate()
    const params = useParams()
    const isLoading = useSelector(storeState => storeState.toysModule.isLoading)

    useEffect(()=>{
        loadToy()
    },[params.toyId])

    async function loadToy(){
        try{
            setLoading(true)
            if(!params.toyId){
                const emptyToy=toysService.getEmptyToy()
                setToyToEdit(emptyToy)
                currentToy.current=emptyToy
            } else {
                const newToy=await toysService.getById(params.toyId)
                setToyToEdit({...newToy})
                currentToy.current=newToy
            }
            setLoading(false)
        }
        catch(err){
            console.log('Error loading Toy:',err)
        }
    }

    function onSaveChange(){
        showInteraction({
            txt:`Are you sure you wants to save this changes?`,
            type:'',
            buttons:[
                {
                    txt:'Save',
                    onClick:async()=>{
                        try{
                            await saveToy(toyToEdit)
                            navigate('/toys')
                        }
                        catch(err){
                            console.log('could not save the changes due to error:',err)
                        }
                    }
                },
                {
                    txt:'Cancle',
                    onClick:()=>{}
                }
            ]
        })
    }
    
    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
            default:
                break;
        }
        setToyToEdit((toy) => ({ ...toy, [field]: value }))
    }

    function handleLabelChange({target}){
        const value = target.name
        const isAdded = target.checked

        const newLabels= isAdded? [...toyToEdit.labels,value] : toyToEdit.labels.filter(label=>label!==value)

        setToyToEdit(toy=>({...toy,labels:newLabels}))
    }

    function isChanged(){
        /*
        const isNull=currentToy.current===null
        const nameChange =toyToEdit.name !== currentToy.current.name
        const priceChange = toyToEdit.price !== currentToy.current.price
        const inStockChange = toyToEdit.inStock !== currentToy.current.inStock
        const labelsLengthChange = toyToEdit.labels.length !== currentToy.current.labels.length
        const labelsChange = toyToEdit.labels.some(label=>currentToy.current.labels.indexOf(label)<-1)
        console.log (isNull,nameChange,priceChange,inStockChange,labelsLengthChange,labelsChange)
        */
        return  currentToy.current===null || 
                toyToEdit.name !== currentToy.current.name || 
                toyToEdit.price !== currentToy.current.price ||
                toyToEdit.inStock !== currentToy.current.inStock ||
                toyToEdit.labels.length !== currentToy.current.labels.length || 
                toyToEdit.labels.some(label=>currentToy.current.labels.indexOf(label)<-1)
    }

    //useBlocker(({currentLocation,nextLocation})=>isChanged()&&currentLocation.pathname !==nextLocation.pathname , 'Are you sure you want to leave? Your changes will be lost.')

    if(!toyToEdit || isLoading) return <Loading />
    const {name, price, labels, inStock} = toyToEdit
    const allLabels=toysService.getLabels()
    return <>
        <div className="toy-edit">
            <div className="toy-edit-data">
                <div className="toy-edit-data-input">
                    <h3>Name:</h3>
                    <input type="text" value={name} name="name" onChange={handleChange}/>
                </div>
                <div className="toy-edit-data-input">
                    <h3>Price(in $):</h3>
                    <input type="number" value={price} name="price" onChange={handleChange}/>
                </div>
                <div className="toy-edit-data-input">
                    <h3>Labels:</h3>
                    <div className="labels">
                        { allLabels.map(label=>
                            <div key={label} className="label">
                                <h4>{label}</h4>
                                <Slider 
                                    isChecked={(labels.indexOf(label))>-1}
                                    name={label}
                                    onChange={handleLabelChange}
                                    />
                            </div> 
                        )}
                    </div>
                </div>
                <h3>In stock: <Slider name='inStock' isChecked={inStock} onChange={handleChange}/> {inStock? 'Yes' : 'No' }</h3>
            </div>
            <button disabled={!isChanged()} onClick={onSaveChange}>Save Changes</button>
        </div>
    </>
}
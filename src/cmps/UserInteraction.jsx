import { eventBusService } from "../services/event-bus.service.js"
import { useState,useEffect } from "react"

// const demoMsg = {
//     txt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus?',
//     type: 'success'
// }

export function UserInteraction() {

    const [msg, setMsg] = useState(null)

    useEffect(() => {
        eventBusService.on('show-user-interaction', msg => {
            setMsg(msg)
        })
    }, [])

    function onCloseMsg() {
        setMsg(null)
    }

    if (!msg) return null
    return (
        <div key='1' className="user-msg-backdrop">
            <dialog key='2' className={`user-msg ${msg.type}`} open>
                <div className={`message`}>
                    <h3>{msg.txt}</h3>
                    <div className="buttons">
                        {msg.buttons.map(button=><button key={button.txt} onClick={
                            ()=>{
                                button.onClick()
                                onCloseMsg()
                            }
                        }>{button.txt}</button>)}
                    </div>
                </div>
            </dialog>
        </div>
    )
}
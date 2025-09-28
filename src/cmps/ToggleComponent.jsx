import { useState } from "react";

export function ToggleComponent({shownComponent,hiddenComponent}){
    const [hidden,setHidden]=useState(false);
    
    function toggle(){
        setHidden(oldhidden=>!oldhidden)
    }

    return <>
        <div onClick={toggle}>
            <div hidden={hidden}>
                {shownComponent}
            </div>
            <div hidden={!hidden}>
                {hiddenComponent}
            </div>
        </div>
    </>
}
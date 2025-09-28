import { useState } from "react"
import { toysService } from "../services/toys.service"

export function Labels({ labels, onChange }) {

    const [myLabels, setMyLabels] = useState(labels)

    const allLabels = toysService.getLabels()

    function handleLabelChange({ target }) {
        const { name, checked } = target
        const value = checked ? [...myLabels, name] : myLabels.filter(label => label !== name)
        setMyLabels(value)
        onChange({name: 'labels', value: value} )
    }

    return <div className="labels">
        {allLabels.map(label =>
            <input key={label} type="checkbox" name={label} checked={myLabels.includes(label)} onChange={handleLabelChange} />
        )}
    </div>


}
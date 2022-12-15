import { PoemsContext } from "../PoemsContext"
import React,{ useContext } from "react"

export default function ShowPoems() {

    const {allPoems} = useContext(PoemsContext)

    let poems = []
    if(allPoems.length > 0) {
        poems = allPoems.slice().reverse()
        poems = poems.map(poem => poem.isFinished && (
            <div 
            key={poem.id}
            className="poem mb-4 border-b py-8"
            >
                {poem.lines.map(line => (
                    <span className="poem-lines" key={line.id} data-location={line.location}>
                        <span className="poem-line first-line"> {line.firstLine}</span>
                        {line.secondLine && <span className="poem-line second-line">{line.secondLine}</span>}
                    </span>
                ))}
            </div>
        ))
    }

    return (
        <div className="poem-list my-10">
            <h4 className="text-gray-500">Past poems</h4>
            {poems.length > 0 && poems}
        </div>
    )
}
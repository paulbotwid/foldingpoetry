import { PoemsContext } from "../PoemsContext"
import React,{ useContext } from "react"

export default function ShowPoems() {

    const {allPoems, deletePoem} = useContext(PoemsContext)

    let poems = []
    if(allPoems.length > 0) {
        poems = allPoems.slice().reverse()
        poems = poems.map(poem => poem.isFinished && (
            <div className="poem-wrapper w-fit group max-w-full">
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
                <span
                    onClick={()=>deletePoem(poem.id)}
                    className="delete-btn absolute transition cursor-pointer opacity-0 text-gray-300 right-0 hover:text-red-500 group-hover:opacity-100 translate-y-[-50%] top-[50%]">
                        <i className="ri-close-line"></i>
                </span>
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
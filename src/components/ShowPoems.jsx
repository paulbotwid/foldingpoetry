import { PoemsContext } from "../PoemsContext"
import React,{ useContext } from "react"
import { Link } from "react-router-dom"
import Poem from "./Poem"

export default function ShowPoems() {

    const {allPoems, deletePoem} = useContext(PoemsContext)

    let poems = []
    if(allPoems.length > 0) {
        poems = allPoems.slice().reverse()
        poems = poems.map(poem => poem.isFinished && (
           <Poem key={poem.id} poem={poem} />
        ))
    }

    return (
        <div className="poem-list hide-before-data-load my-10">
            <h4 className="text-gray-500">Past poems</h4>
            {poems.length > 0 && poems}
        </div>
    )
}
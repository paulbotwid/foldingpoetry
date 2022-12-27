import { PoemsContext } from "../PoemsContext"
import React,{ useContext } from "react"
import Poem from "./Poem"

export default function ShowPoems({finishedPoems}) {

    let poems = []
    if(finishedPoems.length > 0) {
        poems = finishedPoems.slice().reverse()
        poems = poems.map(poem => poem.isFinished && (
           <Poem key={poem.id} poem={poem} />
        ))
    }

    return (
        <div className="poem-list hide-before-data-load">
            <h4>Past poems</h4>
            {
            finishedPoems.length > 0 && 
            poems
            }
        </div>
    )
}


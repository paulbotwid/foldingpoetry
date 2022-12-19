import { useContext, useEffect } from "react"
import { useParams, useLoaderData } from "react-router-dom"
import { PoemsContext } from "../PoemsContext"
import Poem from "../components/Poem"

export default function SinglePoem() {
    
    // const {id} = useParams()
    // const {allPoems} = useContext(PoemsContext)

    const poem = useLoaderData()
    
    console.log("Poem")
    console.log(poem)

    return (
        <div className="single-poem mt-20 text-2xl leading-10">
            <Poem poem={poem} />
        </div>
    )
}
import { useContext, useEffect } from "react"
import { useParams, useLoaderData } from "react-router-dom"
import Poem from "../components/Poem"

export default function SinglePoem() {
    
    const poem = useLoaderData()

    return (
        <div className="single-poem mt-20 text-2xl leading-10">
            <Poem poem={poem} />
        </div>
    )
}
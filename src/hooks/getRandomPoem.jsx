import { useContext, useEffect, useState } from "react"
import { PoemsContext } from "../PoemsContext"
import Axios from "axios"
import Poem from "../components/Poem"

export default function getRandomPoem() {

    const [randomPoem, setRandomPoem] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        Axios.get("http://localhost:3000/getRandomFinishedPoem").then((response)=>{
            setRandomPoem(response.data)
            console.log("Random finished poem")
            console.log(response.data)
        }).catch(error=>{
            console.log(error)
        }).finally(()=>{
            console.log("Loaded random poem successfully")
            setLoading(false)
        })
    }, [])

    return (
        <div className={`hide-when-loading ${loading && "loading"}`}>
            {
            randomPoem && !loading && 
            <Poem isSingle={true} poem={randomPoem} />
            }
        </div>
    )
}

function getRandomNr(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
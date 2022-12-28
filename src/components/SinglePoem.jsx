import { useContext, useEffect, useState } from "react"
import { useParams, useLoaderData } from "react-router-dom"
import Poem from "./Poem"
import getRandomPoem from "../hooks/getRandomPoem"
import { getRandom } from "../utils/api"

export default function SinglePoem({loading, poem = null}) {

    const [thisPoem, setThisPoem] = useState(poem)
    const loadedPoem = useLoaderData()

    useEffect(()=>{
        if(loadedPoem !== undefined) {
            setThisPoem(loadedPoem)
        }
    }, [])

    function getAnother() {
        getRandom().then(randomPoem => {
            setThisPoem(randomPoem)
            console.log(randomPoem)
        })
    }

    return (
        <>
        {
        thisPoem && 
        <>
        <div className={`single-poem text-2xl leading-10 ${loading && "loading"}`}>
            <Poem isSingle={true} poem={thisPoem} />
        </div>
        <a href="#" onClick={getAnother}>Get another</a>
        </>
        }
        </>
    )
}
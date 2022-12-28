import { useContext, useEffect, useRef, useState } from "react"
import { useParams, useLoaderData } from "react-router-dom"
import Poem from "./Poem"
import getRandomPoem from "../hooks/getRandomPoem"
import { getRandom } from "../utils/api"

export default function SinglePoem({loading, poem = null}) {

    const [thisPoem, setThisPoem] = useState(poem)
    const loadedPoem = useLoaderData()

    const getRandomBtn = useRef()

    useEffect(()=>{
        if(loadedPoem !== undefined) {
            setThisPoem(loadedPoem)
        }
    }, [])

    function getAnother() {
        getRandom().then(randomPoem => {
            setThisPoem(randomPoem)
        })
        getRandomBtn.current.classList.add("opacity-0", "pointer-events-none")
    }

    return (
        <>
        {
        thisPoem && 
        <>
            <div key={thisPoem.id} className={`single-poem text-2xl leading-10 ${loading && "loading"}`}>
                <Poem getRandomBtn={getRandomBtn} isSingle={true} poem={thisPoem} />
            </div>
            <a 
            className="get-random-poem-btn opacity-0 transition duration-1000 hover:duration-75 text-btn pointer-events-none" 
            ref={getRandomBtn} href="#" 
            onClick={getAnother}>
                See another
            </a>
        </>
        }
        </>
    )
}
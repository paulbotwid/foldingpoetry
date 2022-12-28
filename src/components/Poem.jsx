import { useContext, useEffect, useState } from "react"
import { Link, useLoaderData } from "react-router-dom"
import TypeIt from "typeit-react"
import getRandomPoem from "../hooks/getRandomPoem"
import { PoemsContext } from "../PoemsContext"
import Lines from "./Lines"

export default function Poem({isSingle = false, poem = null}) {

    const [typeItInstances, setTypeItInstances] = useState([])
   
    useEffect(()=>{
        setTypeItInstances([])
        console.log("new poem, emptied type it instaces")
    }, [poem])

    useEffect(()=>{
        if(typeItInstances.length === poem.lines.length) {
            typeItInstances[0].options({startDelay: 50}).unfreeze()
        }
    }, [typeItInstances])

   const poemLinesTypeIt = poem.lines.map((line, index) => {
        const delayAmount = index === 0 ? 500 : 1000
        const willWait = index === 0 ? true : false
        const options = {
            speed: 50,
            startDelay: delayAmount,
            waitUntilVisible: willWait,
            afterComplete: async () => {
                typeItInstances[index + 1].unfreeze()
            }
        }
        // if single poem, type it out
        return (
            <>
            <TypeIt 
            options={options}
            getBeforeInit={(instance) => {
                index !== 0 && instance.freeze()
                setTypeItInstances(prevInstances => [...prevInstances, instance])
                return instance;
            }}
            className="poem-lines" key={line.id} data-location={line.location}
            >
                <Lines line={line} index={index} poemLinesLength={poem.lines.length} />
            </TypeIt>
            </>
        )
      
    })

    const poemLinesRegular = poem.lines.map((line, index) => (
        <span className="poem-lines" key={line.id} data-location={line.location}>
            <Lines line={line} index={index} poemLinesLength={poem.lines.length} />
        </span>
    ))

    return (
        <>
        <Link
        to={`/poems/${poem.id}`}
        className="poem py-12 block"
        >
            <span>
            {isSingle && poemLinesTypeIt}
            </span>
        </Link>
        <div className="hidden-spacer-poem poem single-poem py-12">
            {poemLinesRegular}
        </div>
        </>
    )
}
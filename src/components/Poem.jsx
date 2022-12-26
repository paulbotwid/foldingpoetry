import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import TypeIt from "typeit-react"
import { PoemsContext } from "../PoemsContext"
import Lines from "./Lines"

export default function Poem({isSingle = false, poem}) {

    const {deletePoem} = useContext(PoemsContext)
    const [typeItInstances, setTypeItInstances] = useState([])

    useEffect(()=>{
        if(typeItInstances.length === poem.lines.length) {
            typeItInstances[0].options({startDelay: 50}).unfreeze()
        }
    }, [typeItInstances])

    return (
        <div className="poem-wrapper w-fit group max-w-full">
                <Link
                to={`/poems/${poem.id}`}
                className="poem py-12 block"
                >
                    <span>
                    {poem.lines.map((line, index) => {
                        const delayAmount = index === 0 ? 250 : 1000
                        if(isSingle) {
                            return (
                                <TypeIt 
                                options={{
                                    speed: 75,
                                    startDelay: delayAmount,
                                    afterComplete: async () => {
                                        typeItInstances[index + 1].unfreeze()
                                    }
                                }}
                                getBeforeInit={(instance) => {
                                    instance.freeze()
                                    setTypeItInstances(prevInstances => [...prevInstances, instance])
                                    return instance;
                                }}
                                className="poem-lines" key={line.id} data-location={line.location}
                                >
                                    <Lines line={line} index={index} poemLinesLength={poem.lines.length} />
                                </TypeIt>    
                            )
                        } else {
                            return (
                                <span className="poem-lines" key={line.id} data-location={line.location}>
                                    <Lines line={line} index={index} />
                                </span>
                            )
                        }
                    })}
                    </span>
                </Link>
                <span
                    onClick={()=>deletePoem(poem.id)}
                    className="delete-btn absolute transition cursor-pointer opacity-0 text-gray-300 right-0 hover:text-red-500 group-hover:opacity-100 translate-y-[-50%] top-[50%]">
                        <i className="ri-close-line"></i>
                </span>
        </div>
    )
}
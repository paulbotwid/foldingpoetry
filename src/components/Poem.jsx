import { useContext } from "react"
import { Link } from "react-router-dom"
import { PoemsContext } from "../PoemsContext"

export default function Poem({poem}) {

    const {deletePoem} = useContext(PoemsContext)

    return (
        <div className="poem-wrapper w-fit group max-w-full">
            <Link
            to={`/poems/${poem.id}`}
            className="poem border-b py-12 block"
            >
                {poem.lines.map(line => (
                    <span className="poem-lines" key={line.id} data-location={line.location}>
                        <span className="poem-line first-line"> {line.firstLine}</span>
                        {line.secondLine && <span className="poem-line second-line">{line.secondLine}</span>}
                    </span>
                ))}
            </Link>
            <span
                onClick={()=>deletePoem(poem.id)}
                className="delete-btn absolute transition cursor-pointer opacity-0 text-gray-300 right-0 hover:text-red-500 group-hover:opacity-100 translate-y-[-50%] top-[50%]">
                    <i className="ri-close-line"></i>
            </span>
        </div>
    )
}
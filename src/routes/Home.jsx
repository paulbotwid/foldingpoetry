import { useContext } from "react"
import PoetryInputs from "../components/PoetryInputs"
import ShowPoems from "../components/ShowPoems"
import ThankYou from "../components/ThankYou"
import { PoemsContext } from "../PoemsContext"

export default function Home(){

    const {didContribute} = useContext(PoemsContext)

    return (
        <>
        { 
        didContribute.status ? 
        <ThankYou/> : 
        <>
        <PoetryInputs />
        <ShowPoems />
        </> 
        }
        <h4>Att göra</h4>
        <ul className='list-disc mb-8'>
            <li>Finished poem reveal, type out line by line</li>
            <li className="line-through">Thank you screen</li>
            <li className="line-through">Email notification</li>
            <li className="line-through">Prevent re-submit to same poem (save id to localhost)</li>
            <li className="line-through">Routes and single poem view</li>
            <li className='line-through'>Validate form (don't allow empty fields)</li>
            <li className='line-through'>Database support</li>
        </ul>
        </>
    )
}
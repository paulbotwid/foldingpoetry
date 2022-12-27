import { useContext } from "react"
import PoetryInputs from "../components/PoetryInputs"
import ShowPoems from "../components/ShowPoems"
import ThankYou from "../components/ThankYou"
import getRandomPoem from "../hooks/getRandomPoem"
import { PoemsContext } from "../PoemsContext"

export default function Home(){

    const {contributionStatus} = useContext(PoemsContext)
    const randomPoem = getRandomPoem()

    return (
        <>
        { 
        contributionStatus.status ? 
        <ThankYou/> : 
        <>
        <div className="start-page relative h-[80vh] flex flex-col justify-between">
            <PoetryInputs />
            <div className="long-arrow-down mb-10 relative w-[1px] left-4 bg-gray-400 text-gray-400 mt-auto h-24"></div>
        </div>
        {randomPoem}    
        </>
        }
        </>
    )
}
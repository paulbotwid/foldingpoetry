import PoetryInputs from "../components/PoetryInputs"
import ShowPoems from "../components/ShowPoems"

export default function Home(){
    return (
        <>
        <PoetryInputs />
        <hr></hr>
        <ShowPoems />
        <h4>Att göra</h4>
        <ul className='list-disc mb-8'>
            <li>Routes and single poem view</li>
            <li>Thank you screen</li>
            <li>Email notification</li>
            <li className='line-through'>Validate form (don't allow empty fields)</li>
            <li className='line-through'>Database support</li>
        </ul>
        </>
    )
}
import { nanoid } from "nanoid"
import { useContext, useState, useRef, useEffect } from "react"
import { PoemsContext } from "../PoemsContext"


export default function PoetryInputs() {

    const {allPoems, createNewPoem, updatePoem, location} = useContext(PoemsContext)
    const [poemStatus, setPoemStatus] = useState("new")
    const [poemInputs, setPoemInputs] = useState({firstLine: "", secondLine: ""})
    const [lastPoem, setLastPoem] = useState(null)

    const firstLineRef = useRef()
    const secondLineRef = useRef()

    // look for a poem that is not finished
    useEffect(()=>{
        const unFinishedPoem = allPoems.find(poem => poem.isFinished === false)
        if(unFinishedPoem !== undefined) { 
            console.log("found unfinished poem")
            setLastPoem(unFinishedPoem)
            // if poem is at target lines, set status to finish
            unFinishedPoem.lines.length === unFinishedPoem.targetLines ? setPoemStatus("finish") : setPoemStatus("continue")
            resetInputs()
        } else if(unFinishedPoem === undefined) {
            console.log("no unfinished found, starting new poem")
            setPoemStatus("new")
        }
    }, [allPoems])

    function handleChange(event) {
        const {name, value} = event.target
        setPoemInputs(prevInputs => ({ ...prevInputs, [name]: value}))
    }

    function submitPoem(e) {
        e.preventDefault()
        if(poemStatus === "new") {
            const newPoem = {
                id: nanoid(),
                lines: [
                    {
                        id: nanoid(),
                        location: location,
                        firstLine: poemInputs.firstLine, 
                        secondLine: poemInputs.secondLine,
                    }
                ],
                isFinished: false,
                targetLines: getRandomNr(3,4)
            }
            createNewPoem(newPoem)
        } else {
            console.log("updating poem")
            const updatedPoem = {
                ...lastPoem,
                lines: [
                    ...lastPoem.lines, 
                    {id: nanoid(), location: location, ...poemInputs}
                ],
                isFinished: poemStatus === "finish" ? true : false
            }
            updatePoem(updatedPoem)
            updatedPoem.isFinished && console.log("Finished the poem!")
        }
        resetInputs()
    }

    function resetInputs() {
        setPoemInputs({firstLine: "", secondLine: ""})
        firstLineRef.current.focus()
    }

    function getTitle() {
        if(poemStatus === "finish") {
            return <h4>Finish the last line of this poem to see the whole thing</h4>
        } else if(poemStatus === "new") {
            return <h4>You are starting a new poem, write the first two lines</h4>
        } else {
            return <h4>Finish the first line of this poem</h4>
        }
    }

    return (
        <div className={`mt-20 mb-8 ${poemStatus === "new" && "new-poem"}`}>
            {getTitle()}
            <form action="">
                <div className="poetry-inputs flex flex-wrap">
                    {
                    poemStatus !== "new" && 
                    <span className="last-line poetry-input mr-2">{lastPoem.lines[lastPoem.lines.length -1].secondLine}</span>
                    }
                   <input type="text"
                    ref={firstLineRef}
                    name="firstLine"
                    autoFocus
                    value={poemInputs.firstLine}
                    onChange={handleChange}
                    className="poetry-input poetry-input--first-line mr-2 flex-grow"
                    autoComplete="off"
                    />
                    {poemStatus !== "finish" && <span className="block w-full">
                        <input type="text"
                        ref={secondLineRef}
                        name="secondLine"
                        value={poemInputs.secondLine}
                        onChange={handleChange}
                        className="poetry-input poetry-input--second-line block"
                        autoComplete="off"
                        />
                    </span>}
                </div>
                <button className="mt-4" onClick={submitPoem}>Submit</button>
            </form>
        </div>
    )
}



function getRandomNr(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
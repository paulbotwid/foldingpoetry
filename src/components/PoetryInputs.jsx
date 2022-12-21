import { nanoid } from "nanoid"
import { useContext, useState, useRef, useEffect } from "react"
import { PoemsContext } from "../PoemsContext"


export default function PoetryInputs() {

    const {
        allPoems, 
        createNewPoem, 
        updatePoem, 
        location, 
        contributions,
        poemsLoaded
    } = useContext(PoemsContext)
    const [poemStatus, setPoemStatus] = useState("new")
    const [poemInputs, setPoemInputs] = useState({firstLine: "", secondLine: ""})
    const [lastPoem, setLastPoem] = useState(null)

    const firstLineRef = useRef()
    const secondLineRef = useRef()


    // Look for a poem that is not finished
    useEffect(()=>{
        if(poemsLoaded) {
            console.log("Poems loaded, looking for unfinished poem")
            const unFinishedPoems = allPoems.filter(poem => {
                return  !contributions.some(contId => contId === poem.id) && poem.isFinished === false
            })
            if(unFinishedPoems.length > 0) { 
                console.log("found " + unFinishedPoems.length + " unfinished poems without contribution, continuing 1st")
                const workingPoem = unFinishedPoems[0]
                setLastPoem(workingPoem)
                // if poem is at target lines, set status to finish, else continue
                workingPoem.lines.length === workingPoem.targetLines ? setPoemStatus("finish") : setPoemStatus("continue")
                resetInputs()
            } else if(unFinishedPoems.length === 0) {
                console.log("no unfinished without contribution, starting new poem")
                setPoemStatus("new")
            }
        }
    }, [poemsLoaded, contributions])

    function handleChange(event) {
        const {name, value} = event.target
        setPoemInputs(prevInputs => ({ ...prevInputs, [name]: value}))
    }

    function submitPoem(e) {
        e.preventDefault()
        const isValid = validateInputs()
        if(isValid) {
            let contributionId = 0;
            if(poemStatus === "new") {
                contributionId = nanoid()
                const newPoem = {
                    id: contributionId,
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
                contributionId = lastPoem.id
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
    }

    function resetInputs() {
        setPoemInputs({firstLine: "", secondLine: ""})
        firstLineRef.current.focus()
    }

    function validateInputs() {
        const firstLine = poemInputs.firstLine.trim()
        const secondLine = poemInputs.secondLine.trim()

        if(firstLine === "" || (secondLine === "" && poemStatus !== "finish" )) {
            if(firstLine.length > 0  && secondLine === "") {
                secondLineRef.current.focus()
            } else if(firstLine === "" && secondLine.length > 0) {
                firstLineRef.current.focus()
            }
            return false
        } else {
            return true
        }
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
        <div className={`poetry-input-wrapper hide-before-data-load mt-20 mb-40 ${poemStatus === "new" && "new-poem"}`}>
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
                <button className="mt-8" onClick={submitPoem}>Submit</button>
            </form>
        </div>
    )
}



function getRandomNr(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
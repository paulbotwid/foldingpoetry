import React, { useEffect, useState } from "react"
import useLocation from "./hooks/useLocation"

const PoemsContext = React.createContext()

function PoemsContextProvider({children}) {

    const [allPoems, setAllPoems] = useState([])
    const [location, setLocation] = useState("")
    const locationData = useLocation()

    // get history from localstorage and get location
    useEffect(()=> {
        if(localStorage.getItem("poems").length > 0) {
            const pastPoems = JSON.parse(localStorage.getItem("poems"))
            setAllPoems(pastPoems)
            console.log("got poems from localStorage")
        }
    }, [])

    // update localstorage
    useEffect(()=>{
        if(allPoems.length > 0) {
            const newPoems = JSON.stringify(allPoems)
            localStorage.setItem("poems", newPoems)
            console.log("updated localstorage")
        }
    }, [allPoems])


    // set location state
    useEffect(()=>{
        locationData && setLocation(locationData.name)
    }, [locationData])


    function createNewPoem(poemObj) {
        console.log("creating new poem")
        setAllPoems(prevPoems => (
            [...prevPoems, poemObj]
        ))
    }

    function updatePoem(updatedPoem) {
        console.log("updating poem " + updatedPoem.id)
        setAllPoems(prevPoems => {
           return prevPoems.map(poem => {
                if(poem.id === updatedPoem.id) {
                    return updatedPoem
                } else {
                    return poem
                }
           })
        })
    }
    
    console.log("allPoems:")
    console.log(allPoems)
    console.log("location: " + location)

    return (
        <PoemsContext.Provider value={{
            allPoems,
            createNewPoem,
            updatePoem, 
            location
        }}>
            {children}
        </PoemsContext.Provider>
    )
}

export {PoemsContext, PoemsContextProvider}
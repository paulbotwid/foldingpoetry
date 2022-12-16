import React, { useEffect, useState } from "react"
import useLocation from "./hooks/useLocation"
import Axios from "axios"

const PoemsContext = React.createContext()

function PoemsContextProvider({children}) {

    const [allPoems, setAllPoems] = useState([])
    const [location, setLocation] = useState("")
    const locationData = useLocation()

    // get history from localstorage and get location
    useEffect(()=> {
        // if(localStorage.getItem("poems").length > 0) {
        //     const pastPoems = JSON.parse(localStorage.getItem("poems"))
        //     setAllPoems(pastPoems)
        //     console.log("got poems from localStorage")
        // }

        Axios.get("http://localhost:3000/getPoems").then((response)=>{
            setAllPoems(response.data)
        })

    }, [])

    // update localstorage
    // useEffect(()=>{
    //     if(allPoems.length > 0) {
    //         const newPoems = JSON.stringify(allPoems)
    //         localStorage.setItem("poems", newPoems)
    //         console.log("updated localstorage")
    //     }
    // }, [allPoems])


    // set location state
    useEffect(()=>{
        locationData && setLocation(locationData.name)
    }, [locationData])


    function createNewPoem(poemObj) {
        console.log("creating new poem")
        Axios.post("http://localhost:3000/createPoem", poemObj).then((response)=>{
            console.log("Created new poem on db, id: " + poemObj.id)
            setAllPoems(prevPoems => (
                [...prevPoems, poemObj]
            ))
        })
    }

    function updatePoem(updatedPoem) {
        Axios.put("http://localhost:3000/updatePoem", updatedPoem).then((response)=>{
            console.log("updating poem " + updatedPoem._id)
            setAllPoems(prevPoems => {
                return prevPoems.map(poem => poem._id === updatedPoem._id ? updatedPoem : poem)
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
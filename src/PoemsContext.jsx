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
        console.log("Getting poems")
        Axios.get("http://localhost:3000/getPoems").then((response)=>{
            setAllPoems(response.data)
        }).catch(error=>{
            console.log(error)
        }).finally(()=>{
            console.log("Loaded poems successfully")
        })
    }, [])



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

    function deletePoem(id) {
        Axios.delete(`http://localhost:3000/deletePoem/${id}`)
        setAllPoems(prevPoems => {
            return prevPoems.filter(poem => poem.id !== id)
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
            location,
            deletePoem
        }}>
            {children}
        </PoemsContext.Provider>
    )
}

export {PoemsContext, PoemsContextProvider}
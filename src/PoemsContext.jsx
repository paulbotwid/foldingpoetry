import React, { useEffect, useState } from "react"
import useLocation from "./hooks/useLocation"
import Axios from "axios"

const PoemsContext = React.createContext()

function PoemsContextProvider({children}) {

    const [allPoems, setAllPoems] = useState([])
    const [location, setLocation] = useState("")
    // an array of the poem ids that the user has contributed to
    const [contributions, setContributions] = useState([])
    const [poemsLoaded, setPoemsLoaded] = useState(false)
    const [didContribute, setDidContribute] = useState({status: false, poemId: ""})
    const locationData = useLocation()

    // Look for past contributions 
    useEffect(()=>{
        if(localStorage.getItem("contributions")) {
            console.log("found past contributions:")
            console.log(localStorage.getItem("contributions"))
            setContributions(JSON.parse(localStorage.getItem("contributions")))
        } 
    }, [])

    // Update localstorage together with contributions state
    useEffect(()=>{
        localStorage.setItem("contributions", JSON.stringify(contributions))
    }, [contributions])

    // get history from localstorage and get location
    useEffect(()=> {
        console.log("Getting poems")
        Axios.get("http://localhost:3000/getPoems").then((response)=>{
            setAllPoems(response.data)
            console.log("allPoems:")
            console.log(response.data)
        }).catch(error=>{
            console.log(error)
        }).finally(()=>{
            console.log("Loaded poems successfully")
            setPoemsLoaded(true)
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
        addContribution(poemObj.id)
    }

    function updatePoem(updatedPoem) {
        Axios.put("http://localhost:3000/updatePoem", updatedPoem).then((response)=>{
            setAllPoems(prevPoems => {
                return prevPoems.map(poem => poem.id === updatedPoem.id ? updatedPoem : poem)
            })
        })
        if(updatedPoem.isFinished) {
            Axios.get(`http://localhost:3000/api/sendemail/${updatedPoem.id}`).then((response)=>{
               console.log("Axios: sent emails. Response:")
               console.log(response)
            })
        }
        addContribution(updatedPoem.id)
    }

    function deletePoem(id) {
        Axios.delete(`http://localhost:3000/deletePoem/${id}`)
        setAllPoems(prevPoems => {
            return prevPoems.filter(poem => poem.id !== id)
        })
    }

    function addContribution(contId) {
        setContributions(prevContributions => (
            prevContributions.some(pastId => pastId === contId) ? prevContributions : [...prevContributions, contId]
        ))
        setDidContribute({status: true, poemId: contId})
    }


    return (
        <PoemsContext.Provider value={{
            allPoems,
            createNewPoem,
            updatePoem, 
            location,
            deletePoem,
            contributions,
            poemsLoaded,
            didContribute
        }}>
            {children}
        </PoemsContext.Provider>
    )
}

export {PoemsContext, PoemsContextProvider}
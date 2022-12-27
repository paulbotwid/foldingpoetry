import React, { useEffect, useState } from "react"
import useLocation from "./hooks/useLocation"
import Axios from "axios"

const PoemsContext = React.createContext()

function PoemsContextProvider({children}) {

    const [unfinishedPoems, setUnfinishedPoems] = useState([])
    const [location, setLocation] = useState("")
    // an array of the poem ids that the user has contributed to
    const [contributions, setContributions] = useState([])
    const [poemsLoaded, setPoemsLoaded] = useState(false)
    const [contributionStatus, setContributionStatus] = useState({status: false, poem: null})
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
        Axios.get("http://localhost:3000/getUnfinishedPoems").then((response)=>{
            setUnfinishedPoems(response.data)
            console.log("unfinishedPoems:")
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
        })
        addContribution(poemObj)
    }

    function updatePoem(updatedPoem) {
        Axios.put("http://localhost:3000/updatePoem", updatedPoem).then((response)=>{
            console.log("updated poem succesfully: ")
            console.log(response)
        })
        if(updatedPoem.isFinished) {
            Axios.get(`http://localhost:3000/api/sendemail/${updatedPoem.id}`).then((response)=>{
               console.log("Axios: sent emails. Response:")
               console.log(response)
            })
        }
        addContribution(updatedPoem)
    }

    function deletePoem(id) {
        Axios.delete(`http://localhost:3000/deletePoem/${id}`).then((res)=>{
            console.log("deleted poem succesfully")
        })
    }

    function addContribution(poem) {
        setContributions(prevContributions => (
            prevContributions.some(pastId => pastId === poem.id) ? prevContributions : [...prevContributions, poem.id]
        ))
        setContributionStatus({status: true, poem: poem})
    }


    return (
        <PoemsContext.Provider value={{
            unfinishedPoems,
            createNewPoem,
            updatePoem, 
            location,
            deletePoem,
            contributions,
            poemsLoaded,
            contributionStatus
        }}>
            {children}
        </PoemsContext.Provider>
    )
}

export {PoemsContext, PoemsContextProvider}
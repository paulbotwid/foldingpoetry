import React, { useEffect, useState } from "react"
import useCountry from "./hooks/useCountry"
import Axios from "axios"
import { api } from "./utils/api"

import { useSearchParams } from "react-router-dom"

const PoemsContext = React.createContext()

function PoemsContextProvider({children}) {

    const [unfinishedPoems, setUnfinishedPoems] = useState([])
    const [location, setLocation] = useState("")
    // an array of the poem ids that the user has contributed to
    const [contributions, setContributions] = useState([])
    const [poemsLoaded, setPoemsLoaded] = useState(false)
    const [contributionStatus, setContributionStatus] = useState({status: false, poem: null})
    const locationData = useCountry()

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

    // get unfinished poems
    useEffect(()=> {
        console.log("Getting unfinished poems")
        api.get("getUnfinishedPoems").then((response)=>{
            setUnfinishedPoems(response.data)
            console.log("Found unfinished poems:")
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
        api.post("createPoem", poemObj).then((response)=>{
            console.log("Created new poem on db, id: " + poemObj.id)
        })
        addContribution(poemObj)
    }

    function updatePoem(updatedPoem) {
        api.put("updatePoem", updatedPoem).then((response)=>{
            console.log("updated poem succesfully: ")
            console.log(response)
        })
        if(updatedPoem.isFinished) {
            api.get(`api/sendemail/${updatedPoem.id}`).then((response)=>{
               console.log("api: sent emails. Response:")
               console.log(response)
            })
        }
        addContribution(updatedPoem)
    }

    function deletePoem(id) {
        api.delete(`deletePoem/${id}`).then((res)=>{
            console.log("deleted poem succesfully")
            console.log(res)
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
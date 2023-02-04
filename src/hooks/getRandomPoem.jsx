import { useContext, useEffect, useState } from "react"
import { api } from "../utils/api"

export default function getRandomPoem() {

    const [randomPoem, setRandomPoem] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        api.get("getRandomFinishedPoem").then((response)=>{
            setRandomPoem(response.data)
        }).catch(error=>{
            console.log(error)
        }).finally(()=>{
            console.log("Random poem loaded successfully")
            setLoading(false)
        })
    }, [])

    return {randomPoem, loading}
}
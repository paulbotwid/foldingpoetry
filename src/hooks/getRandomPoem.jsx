import { useContext, useEffect, useState } from "react"
import Axios from "axios"

export default function getRandomPoem() {

    const [randomPoem, setRandomPoem] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        Axios.get("http://localhost:3000/getRandomFinishedPoem").then((response)=>{
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
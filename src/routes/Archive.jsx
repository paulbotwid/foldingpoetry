import { useState, useEffect } from "react";
import ShowPoems from "../components/ShowPoems";
import Axios from "axios"

export default function Archive() {

    const [finishedPoems, setFinishedPoems] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        Axios.get("http://localhost:3000/getFinishedPoems/50").then((response)=>{
            setFinishedPoems(response.data)
            console.log("Finished poems:")
            console.log(response.data)
        }).catch(error=>{
            console.log(error)
        }).finally(()=>{
            console.log("Loaded finished poems successfully")
            setLoading(false)
        })
    }, [])

    return (
        <div className={`${loading && "loading"} hide-when-loading`}>
            {
            !loading && 
                <ShowPoems finishedPoems={finishedPoems} />
            }
        </div>
    )
}
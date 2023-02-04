import axios from "axios";


const baseUrl = import.meta.env.PROD ? {baseURL: "https://foldingpoetry.com/"} : {baseURL: "http://localhost:3000/"}
const api = axios.create(baseUrl)

function getRandom() {
    return api.get("getRandomFinishedPoem").then((response)=>{
        return response.data
    }).catch(error=>{
        console.log(error)
        return error
    })
}


export {api, getRandom}

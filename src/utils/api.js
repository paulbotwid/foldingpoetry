import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/"
})

function getRandom() {
    return api.get("getRandomFinishedPoem").then((response)=>{
        return response.data
    }).catch(error=>{
        console.log(error)
        return error
    })
}


export {api, getRandom}

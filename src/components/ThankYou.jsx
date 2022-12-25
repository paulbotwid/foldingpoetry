import Axios from "axios"
import { useContext, useState } from "react"
import { PoemsContext } from "../PoemsContext"

export default function ThankYou() {

    const [inputs, setInputs] = useState({email: ""})
    const [didSubmitEmail, setDidSubmitEmail] = useState(false)

    const {didContribute} = useContext(PoemsContext)

    function handleChange(event) {
        const {name, value} = event.target
        setInputs(prevInputs => ({ ...prevInputs, [name]: value}))
    }

    function submitForm(e) {
        e.preventDefault()
        Axios.put("http://localhost:3000/addEmailToGroup", {email: inputs.email, id: didContribute.poemId}).then((response)=>{
           console.log("added email to group, response:")
           console.log(response)
           setDidSubmitEmail(true)
        })
    }

    return (
        <section className="thank-you mt-12 mb-24">
            <h2>Thanks for your contribution</h2>
            <p>If you want to be notified when the poem you contributed to is finished, submit your email address below.</p>
           { 
           didSubmitEmail ? 
           <p className="mt-6">Thanks ❤️ we'll let you know</p> :
           <form action="">
                <input 
                name="email"
                type="email" 
                onChange={handleChange}
                value={inputs.email}
                placeholder="Email"
                className="block my-4 w-72"/>
                <button onClick={submitForm}>Submit</button>
            </form>
            }

        </section>
    )
}
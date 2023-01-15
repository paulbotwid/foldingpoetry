import Axios from "axios"
import { useContext, useState } from "react"
import { PoemsContext } from "../PoemsContext"
import Poem from "../components/Poem"
import { Link } from "react-router-dom"

export default function ThankYou() {

    const [inputs, setInputs] = useState({email: ""})
    const [didSubmitEmail, setDidSubmitEmail] = useState(false)

    const {contributionStatus} = useContext(PoemsContext)

    function handleChange(event) {
        const {name, value} = event.target
        setInputs(prevInputs => ({ ...prevInputs, [name]: value}))
    }

    function submitForm(e) {
        e.preventDefault()
        Axios.put("http://localhost:3000/addEmailToGroup", {email: inputs.email, id: contributionStatus.poem.id}).then((response)=>{
           console.log("added email to group, response:")
           console.log(response)
           setDidSubmitEmail(true)
        })
    }

    function sharePoem() {
        const url = window.location.protocol + window.location.host + "/?shared=" + contributionStatus.poem.id
        copyToClipboard(url)
    }

    return (
        <section className="thank-you mb-40">
            <h2>Thanks for your contribution</h2>
            {contributionStatus.poem.isFinished && <p>The poem you finished can be found below</p> }
            {
            didSubmitEmail && 
            <>
            <p className="mt-6">Cool, we'll let you know</p>
            <Link to="/"><button>Start again</button></Link>
            </>
            }
            {
            // did not already submit email, AND poem is not finished
            !didSubmitEmail && !contributionStatus.poem.isFinished &&
            <>
            <p>If you want us to let you know when the poem is finished (so you can read it), type in your email below.</p>
            <form className="my-8" action="">
                    <input 
                    name="email"
                    type="email" 
                    onChange={handleChange}
                    value={inputs.email}
                    placeholder="Email"
                    className="block my-4 w-72"/>
                    <button onClick={submitForm}>Submit</button>
            </form>
            <hr />
            <p className="mt-8">
                Want your friend to take up where you left off?
            </p>
            <button className="block my-2" onClick={sharePoem}>Copy poem url</button>
            or
            <Link to="/"><button className="block my-2 border-black text-black">Go again</button></Link>
            </>
            }
            {contributionStatus.poem.isFinished && <Poem isSingle={true} poem={contributionStatus.poem} />}

        </section>
    )
}


function copyToClipboard(text) {
     // Copy the text inside the text field
    navigator.clipboard.writeText(text)
    .then(()=>{
        console.log("success copy: " + text)
    }, () =>{
        console.log("failed copy")
    })
}
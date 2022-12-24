import { useState } from "react"

export default function ThankYou() {

    const [inputs, setInputs] = useState({email: ""})

    function handleChange(event) {
        const {name, value} = event.target
        setInputs(prevInputs => ({ ...prevInputs, [name]: value}))
    }

    function submitForm(e) {
        e.preventDefault()
    }

    return (
        <section className="thank-you my-12">
            <h2>Thanks for your contribution</h2>
            <p>If you want to be notified when the poem you contributed to is finished, submit your email address below.</p>
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

        </section>
    )
}
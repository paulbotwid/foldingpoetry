import { useState } from 'react'
import PoetryInputs from './components/PoetryInputs'
import ShowPoems from './components/ShowPoems'
import useLocation from './hooks/useLocation'

function App() {

  function clearLocalstorage() {
    localStorage.setItem("poems", "")
  }

  return (
    <div className="App">
      <div className="container">
        <PoetryInputs />
        <hr></hr>
        <ShowPoems />
        
        <h4>Att göra</h4>
        <ul className='list-disc mb-8'>
            <li>Thank you screen</li>
            <li>Email notification</li>
            <li>Validate form (don't allow empty fields)</li>
            <li className='line-through'>Database support</li>
        </ul>
      </div>
    </div>
  )
}

export default App

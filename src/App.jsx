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
      <PoetryInputs />
      <hr></hr>
      <ShowPoems />

      <button className='fixed bottom-4 right-4' onClick={clearLocalstorage}>Clear localStorage</button>
      
      <h4>Att göra</h4>
      <ul className='list-disc'>
          <li>Thank you screen</li>
          <li>Email notification</li>
          <li>Database support</li>
      </ul>
    </div>
  )
}

export default App

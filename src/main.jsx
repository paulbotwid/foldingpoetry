import React from 'react'
import ReactDOM from 'react-dom/client'
import { PoemsContextProvider } from './PoemsContext'
import App from './App'

import './style.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <PoemsContextProvider>
      <App />
    </PoemsContextProvider>  
  // </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PoemsContextProvider } from './PoemsContext'
import Root from './routes/Root'
import Home from './routes/Home'
import Archive from './routes/Archive'
import ErrorPage from './errorPage'
import Poem from './components/Poem'
import Axios from 'axios'

import './style.scss'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/poems/:id",
        element: <Poem isSingle={true} />,
        errorElement: <ErrorPage />,
        loader: async ({params}) => {
          return (
            Axios.get(`http://localhost:3000/getSingle/${params.id}`).then((response)=>{
                return response.data
            })
          )
        }
      },
      {
        path: "/archive",
        element: <Archive />
      }
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <PoemsContextProvider>
        <RouterProvider router={router} />
      </PoemsContextProvider>  
  // </React.StrictMode>,
)

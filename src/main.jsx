import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PoemsContextProvider } from './PoemsContext'
import Root from './routes/Root'
import Home from './routes/Home'
import Archive from './routes/Archive'
import ErrorPage from './errorPage'
import SinglePoem from './components/SinglePoem'
import Axios from 'axios'

import './style.scss'
import RandomPoem from './routes/RandomPoem'


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
        element: <SinglePoem />,
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
      },
      {
        path: "/random",
        element: <RandomPoem />
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

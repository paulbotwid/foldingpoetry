import { useContext } from "react"
import { Outlet, useNavigation } from "react-router-dom"
import Header from "../components/Header"
import Spinner from "../components/Spinner"
import { PoemsContext } from "../PoemsContext"

function Root() {

  const routerNavigation = useNavigation()

  const {poemsLoaded} = useContext(PoemsContext)

  return (
    <div className={`App ${poemsLoaded ? "poems-loaded" : "poems-not-loaded"}`}>
      <Header />
      <div className="container hide-before-data-load">
        {routerNavigation.state === "loading" && <Spinner />}
        <Outlet/>
      </div>
    </div>
  )
}

export default Root

import { useContext } from "react"
import { Outlet, useNavigation } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Spinner from "../components/Spinner"
import { PoemsContext } from "../PoemsContext"

function Root() {

  const routerNavigation = useNavigation()

  const {poemsLoaded} = useContext(PoemsContext)

  return (
    <>
    <div className={`App pb-20 ${poemsLoaded ? "poems-loaded" : "poems-not-loaded"}`}>
      <Header />
      <div className="container hide-before-data-load my-20">
        {routerNavigation.state === "loading" && <Spinner />}
        <Outlet/>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Root

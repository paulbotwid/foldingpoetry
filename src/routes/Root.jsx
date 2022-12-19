import { Outlet, useNavigation } from "react-router-dom"
import Header from "../components/Header"
import Spinner from "../components/Spinner"

function Root() {

  const routerNavigation = useNavigation()
  console.log(routerNavigation)

  return (
    <div className="App">
      <Header />
      <div className="container">
        {routerNavigation.state === "loading" && <Spinner />}
        <Outlet/>
      </div>
    </div>
  )
}

export default Root

import { Outlet } from "react-router-dom"
import NavBar from "../components/nav/NavBar"
import Footer from "../components/home/Footer"


function Layout() {
  return <>
    <NavBar />
    <Outlet />
    <Footer />
  </>
}

export default Layout
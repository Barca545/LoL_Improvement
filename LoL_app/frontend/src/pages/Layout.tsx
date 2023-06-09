import React from "react";
import {Outlet, Link} from "react-router-dom";


const NavBar= () => {
  return(
    <>
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/cs-tracker'>CS Problems</Link>
        </li>
        <li>
          <Link to='/vod-reviews'>VOD Review</Link>
        </li>
        <li>
          <Link to='/progress-tracker'>Progress Tracker</Link>
        </li>
      </ul>
    </nav>
    </>
  )
}
const Layout = () => {
  return(
    <>
      <NavBar/>
      <Outlet/>
    </>
    
  )
}

export default Layout
import React, { useState, useEffect} from "react";
import {Outlet, Link} from "react-router-dom";
import {useAppSelector,useAppDispatch} from '../app/hooks';
import { getAccessToken } from "../app/slices/authSlice";

const NavBar= () => {
  const [isAuth, setIsAuth] = useState(false)  
  const access = useAppSelector(getAccessToken)
  useEffect(() => {
    if (access !== null) {
      setIsAuth(true); 
    }
   }, [isAuth]);
  
   return(
    ///deleted the empty <> around <nav> re-add if an issue comes up
    <nav>
      <ul>
        {isAuth ? <li> <Link to='/'>Home</Link> </li>: null}
        <li>
          <Link to='/cs-tracker'>CS Problems</Link>
        </li>
        <li>
          <Link to='/vod-reviews'>VOD Review</Link>
        </li>
        <li>
          <Link to='/progress-tracker'>Progress Tracker</Link>
        </li>
        <li>
          {isAuth ? 
            <Link to='/logout'>Logout</Link>:  
            <Link to='/login'>Login</Link>}
        </li>
      </ul>
    </nav>
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
import React from "react";
import { useAppSelector } from "../app/hooks";
import { getAccessToken, getRefreshToken } from "../app/slices/authSlice";
import { AccessToken } from "../services/types/login-types";

const Home = () => {
  const accessToken = useAppSelector(getAccessToken)
  const refreshToken = useAppSelector(getRefreshToken)
  
  const handleClick = (e:any) => {
    console.log('was clicked')
    const token:AccessToken = {
      access:accessToken,
      refresh:refreshToken
    }
    console.log(token)
    console.log('was clicked 2')
  }
  
  return(
    <div>
      <h1>Home</h1>
      <input type="button" value='Bug test' onClick={(e)=>handleClick(e)}/>
    </div>
  )
}

export default Home
import { useEffect,useState } from "react";
import axios from "axios";
import { recievedToken,getRefreshToken} from "../app/slices/authSlice";
import { useAppSelector } from "../app/hooks";

export const Logout = () => {
  let refreshToken = getRefreshToken
  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.post('http://localhost:8000/token/refresh/',{
          refresh: refreshToken,
          ///are these the right headers?
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        });

        console.log('logout', data)
        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;
        window.location.href = '/login'
      } 
      catch (e) {console.log('logout not working')}
    })();
}, []);
return (
  <>
  </>
)}
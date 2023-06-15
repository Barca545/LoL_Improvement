import React, {useState} from "react";
import axios from "axios";
import {User,AuthState,AccessToken} from "../services/types/login-types";
import {recievedToken} from '../app/slices/authSlice';
import {useAppSelector,useAppDispatch} from '../app/hooks';   

export const Login = () =>{
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const user:User = {
      username: username,
      password: password
    }

    /// I want to find a way to move this into the API file.
    ///are these the right headers?
    const {data} = await axios.post('token/',
    user,{headers:{'Content-Type': 'application/json'}})
      
    const token:AccessToken = {
      access: data.access,
      refresh: data.access
    }
    
    dispatch(recievedToken(token))
    dispatch(data.token.refresh)
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
    window.location.href = '/'
  }
  
  return(
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group">
            <label>Username</label>
            <input className="form-control" 
              placeholder="Enter Username" 
              name='username'  
              type='text' value={username}
              required 
              onChange={e => setUsername(e.target.value)}/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name='password' 
              type="password"     
              className="form-control"
              placeholder="Enter password"
              value={password}
              required
              onChange={e => setPassword(e.target.value)}/>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" 
              className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
}
  

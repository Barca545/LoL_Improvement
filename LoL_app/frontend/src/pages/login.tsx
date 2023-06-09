import React, {useState} from "react";
import axios from "axios"
import {User} from "../services/types/login-types"

export const Login = () =>{
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user:User = {
      username: username,
      password: password
    }
    
    const {data} = await axios.post('token/',
    user,{headers:{'Content-Type': 'application/json'}})
    
    localStorage.clear();
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
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
  

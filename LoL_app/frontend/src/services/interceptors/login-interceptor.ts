import axios from "axios";
import store from "../../app/store";
import {recievedToken} from '../../app/slices/authSlice';
import { AccessToken } from "../types/login-types";

let refresh = false 

/*issue seems to be that whatever is being returned by the request 
 is not being sent to the store.
 next step is to include debug stuff here to check where the points of failure occur
 JC recomended storing stuff in sessionstorage or as cookies
 */

axios.interceptors.response.use(res => res, async error => {
  if (error.response.responseStatus === 401 && !refresh) {
    refresh = true;
    ///will this cause issues? No other example I see does it this way
    let refreshToken = store.getState().auth.token.refresh
    
    console.log(refreshToken)
    
    const response = await 
    axios.post('http://localhost:8000/token/refresh/',{
      refresh: refreshToken,
      ///are these the right headers?
      headers: {'Content-Type': 'application/json'},
      withCredentials: true});
    
      if (response.status === 200) {
      axios.defaults.headers.common['Authorization'] = `Bearer 
      ${response.data['access']}`;
      let token:AccessToken = {
        access: response.data.access,
        refresh: response.data.refresh,
      }
      store.dispatch(recievedToken(token))
      return axios(error.config);
    }
  }
  refresh = false;
  return error;
})


import { createSlice,PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../store';
import {AuthState,AccessToken} from '../../services/types/login-types'

///isAuth possibly can just remain a state in the Layout page.
const initialState:AuthState = {
  isAuth: false,
  token: {
    access:null,
    refresh:null
  },
  responseStatus: null
}

export const authTokenSlice = createSlice({
  name: 'authtoken',
  initialState: initialState,
  reducers: {
    recievedisAuth: (state,action:PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    recievedToken: (state,action:PayloadAction<AccessToken>) => {
      state.token = action.payload
    }
  }
})

export const {recievedisAuth,recievedToken} = authTokenSlice.actions;
export default authTokenSlice.reducer;

///selectors 
export const getAccessToken = (state:RootState) => {
  return state.auth.token.access
}

export const getRefreshToken = (state:RootState) => {
  return state.auth.token.refresh
}
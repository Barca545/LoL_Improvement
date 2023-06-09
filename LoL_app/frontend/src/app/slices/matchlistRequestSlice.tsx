import { createSlice,PayloadAction} from '@reduxjs/toolkit'
import {MatchlistRequestState} from '../../services/types/matchlist-types'
import { RootState } from '../store'
import {useGetMatchlistQuery} from '../../services/apiSlice'

///delete in final build. I think this is entirely unused.

const initialState: MatchlistRequestState = {
  ///the default url should just lead to a blank page that says like "search for a summoner"
  requesturl: 'http://127.0.0.1:8000/matchlist/atmost/na1/2/', 
  matchlistresponse:null
}

export const matchlistRequestSlice = createSlice({
  name:'matchlistrequest',
  initialState,   
  reducers: {
    setUrl: (state,action:PayloadAction<string>) => {
      state.requesturl = action.payload
    },
}})

///selectors
export function getRequestUrl(state:RootState){///the matchlist slice versus the request slice might need to be a distinct one
  const url = state.matchlistrequest.requesturl
  return url
}

///actions
export const {setUrl} = matchlistRequestSlice.actions;

///reducers
export default matchlistRequestSlice.reducer;
///I feel like there should be a way to use a selector to grab the whole slice instead of just individual values.


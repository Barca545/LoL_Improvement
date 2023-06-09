import { createSlice,PayloadAction} from '@reduxjs/toolkit'
import {MatchlistRequestState} from '../../services/types/matchlist-types'
import { RootState } from '../store'
import {  csResultsState,csResults  } from '../../services/types/matchinfo-types'

const initialState:csResultsState ={
  matchinfo:{ 
    id: 'placeholder',
    type:'placeholder',
    duration:'placeholder',
    cspm:2,
    cs15:2,
    allcs:{},
    problem:{}},
  responseStatus:null
}

export const matchInfoSlice = createSlice({
    name: 'matchinfo',
    initialState: initialState,
    reducers:{
      recievedInfo: (state,action:PayloadAction<csResults>) => {
        state.matchinfo = action.payload
      }
    }
})

export const {recievedInfo} = matchInfoSlice.actions;
export default matchInfoSlice.reducer;
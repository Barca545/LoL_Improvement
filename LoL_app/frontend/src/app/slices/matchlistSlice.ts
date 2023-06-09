import { createSlice,PayloadAction} from '@reduxjs/toolkit';
import {MatchListState,Match} from '../../services/types/matchlist-types';
import { useNavigate } from 'react-router-dom'; ///delete?

///move to a more universal folder

///port the functionality for grabing a match from match-display to here. Not urgent.
///dispatch setMatchList in search set it equal to const matchlist:MatchList = JSON.parse(useGetMatchlistQuery(url).data)
///use a selector to grab info for each specific match based on the matchid

const initialState: MatchListState = {
  matchlist:{},
  responseStatus: null}

export const matchlistSlice = createSlice({
  name: 'matchlist',
  initialState:initialState,
  reducers:{ 
    recievedMatchList: (state,action:PayloadAction<Match[]>) => {
      const matchlist = action.payload;
      ///console.log(matchlist)
      Object.values(matchlist).forEach(match => {
        state.matchlist[match.id] = match;
        ///console.log(state.matchlist)
      })
    },
  },
});

export const {recievedMatchList} = matchlistSlice.actions
export default matchlistSlice.reducer;
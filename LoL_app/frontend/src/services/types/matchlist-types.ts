export interface MatchlistRequest{
  region: string|null,
  summonername:string|null,
  number:number|null,
}

export interface MatchlistRequestState {
  requesturl: string,
  matchlistresponse:null | string 
}

///https://redux-toolkit.js.org/rtk-query/usage-with-typescript

export interface summoner {
  name:string,
  role: string,
  kills: number,
  deaths: number,
  assists: number,
  kda: number,
  champion: string,
  items: [number],
  spells: Array<number>,
}

export interface Match {
  id: string,
  duration: string,
  type: string,
  kda: string, 
  region:string, ///need for the cs detail code the backed to return
  puuid:string, ///need for the cs detail code the backed to return
  summoner_spells: Array<number>,
  summoners_list: Array<summoner>,
}

export interface MatchListState{
  ///also structure this to show the summoner name and info about the summoner 
  matchlist:{[matchID:string]:Match},
  responseStatus: string|null
} 

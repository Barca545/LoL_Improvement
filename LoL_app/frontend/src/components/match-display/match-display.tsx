import React, {useState,useEffect} from 'react'; ///do I need to do this?
import {useAppSelector,useAppDispatch} from '../../app/hooks'; 
import {Match} from '../../services/types/matchlist-types'
import './match-display.css';
import { useNavigate } from 'react-router-dom'; 
import {get} from '../../services/api'
import {recievedInfo} from '../../app/slices/matchinfoSlice'

///eventually code this so it does not give the option to view CS for ARAMs or Support games since those stats are irrelevanrt

///need to add matchid, game duration,game type and whatever other info is on the matchitem type to the URL  

///display matches border needs to expand with the length of the contents
export default function DisplayMatches(){
  const matchlist = useAppSelector(state => state.matchlist.matchlist)
  return(
    <div className='match-display'> 
      <div className='summoner-info'>
        {/*This can probably be static. Just show name icon and rank*/}
      </div>
      <div className='game-list'>
        {Object.values(matchlist).map(match => {
          return <GameItem match={match}/>
        })}
      </div>
    </div>) 
}  

function GameItem(props:any){
  const match:Match = props.match
  ///for some reason match type is not showing up
  return(
    <div>
      <details className='game-item'>
        <summary className='header-stats'>
          <div>Match ID: {match.id}</div>
          <div>Game Duration: {match.duration}</div>
          <div>Game Type: {match.type}</div>
          <div>KDA: {match.kda/*grab the info of the summoner we are looking for idk how*/}</div>
        </summary>
        <PlayersInfo match={match}/>
      </details> 
    </div>  
)}

function PlayersInfo(props:any){
  const match:Match= props.match;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function MoreDetails() {
    ///Consider including this in the GameItem section instead
    get(`http://127.0.0.1:8000/cs_details/${match.id}/${match.puuid}/${match.region}/${match.type}/`).then((csdetails) =>{
      console.log(csdetails)///debugging
      dispatch(recievedInfo(csdetails));
    })
    return (
        <button onClick={() => navigate('/match-info')}>
          More Details
        </button>
    );
  }

  return(
    <div>{match.summoners_list.map(summoner => (
      <div className='player-info' key={summoner.name}>
        <span className='player-info-component'>Name: {summoner.name}</span>
        <span className='player-info-component'>KDA: {summoner.kda}</span>
        <span className='player-info-component'>Items: {summoner.items}</span>
        <span className='player-info-component'>Summoner Spells: {summoner.spells}</span> 
      </div>
  ))}
    <div className='more-details'>
      <MoreDetails/>
    </div>
  </div>
)}
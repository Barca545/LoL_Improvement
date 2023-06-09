///this page needs to be connected to the router and then connected to the show more details button
import React from "react";
import {useAppSelector,useAppDispatch} from '../app/hooks'; 
import { csResults } from "../services/types/matchinfo-types";


const MatchInfo = () => {
    const matchinfo = useAppSelector(state => state.matchinfo.matchinfo)
    return(
    <>
      <h1>Match Info</h1>
      <div className='match-id'>Match ID: {matchinfo?.id} </div>
      <div className='cs-15'>CS@15:{matchinfo?.cs15} </div>
      <div className='cspm'>CSPM:{matchinfo?.cspm}</div>
      <ul className="problem-cs" >
        {Object.entries(matchinfo.problem).map(problem =>{
          return(
            <li>
              <span>Time: {problem[0]}</span>
              <span>CS: {problem[1]}</span>
            </li>
          )})}
      </ul>
      <details>
        <summary>show CS at each minute</summary>
        <ul className="all-cs" >
        {Object.entries(matchinfo.allcs).map(cs =>{
          return(
            <li>
              <span>Time: {cs[0]}</span>
              <span>CS: {cs[1]}</span>
            </li>
          )})}
      </ul>
      </details>
    </>
  )
}



export default MatchInfo
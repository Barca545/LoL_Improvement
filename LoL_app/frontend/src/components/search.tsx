import {useState} from 'react';
/// delete react select from the project///
///import {useGetMatchlistQuery } from '../../services/apiSlice';
import {setUrl,getRequestUrl} from '../app/slices/matchlistRequestSlice'
import {useAppDispatch,useAppSelector} from '../app/hooks';
import { recievedMatchList } from '../app/slices/matchlistSlice';
import {get} from '../services/api';

export default function SearchMatch(){
  const dispatch = useAppDispatch();
  const [region,setRegion] = useState('na1')
  const [summonername,setSummonername] = useState('')
  const [number,setNumber] = useState(1)

  //delete the request slice

  ///this is where I dispatch the action https://stackoverflow.com/a/70211326
  function handleSubmit(region:string,summonername:string,number:number){
    get(`http://127.0.0.1:8000/matchlist/${summonername}/${region}/${number}/`).then((matchlist) => {
      console.log(matchlist)///for debugging
      dispatch(recievedMatchList(matchlist));
    });
  }

  return(
      <div className='searchBar'>
        <form>
          <span className='search-form-item'>
          <input 
            className="text" 
            type='select' 
            placeholder="Search Summoner..." 
            onChange={(e)=>setSummonername(e.target?.value)}/>
          </span>
          <span className='search-form-item'>
            <select className='number-of-selector' onChange={(e)=>setRegion(e.target?.value)}> 
              <option value='na1'>NA</option>
              <option value='kr'>KR</option>
              <option value='oc1'>OCE</option>
              <option value='euw1'>EUW</option>
              <option value='eun1'>EUNE</option>
              <option value='br1'>BR</option>
              <option value='jp1'>JP</option>
              <option value='la1'>LA1</option>
              <option value='la2'>LA2</option>
              <option value='tr1'>TR</option>
              <option value='ph2'>PH</option>
              <option value='sg2'>SG</option>
              <option value='th2'>TH</option>
              <option value='tw2'>TW</option>
              <option value='vn2'>VN</option>
            </select>
          </span>
          <span className="search-form-item">
            <select className='number-of-selector' onChange={(e)=>setNumber(parseInt(e.target?.value))} > 
              <option value={1}>Most recent</option>
              <option value={5}>Past five</option>
              <option value={10}>Past ten</option>
              <option value={20}>Past twenty</option>
            </select>
          </span>
          <span className='search-form-item'> 
            <input type='button' value='Search' onClick={() =>{handleSubmit(region,summonername,number)}}/>  
          </span>
        </form>
      </div>
           
  )
}
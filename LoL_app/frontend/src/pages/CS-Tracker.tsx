import React from "react";
import SearchMatch from '../components/search';
import DisplayMatches from '../components/match-display/match-display'

const CSTracker = () => {
  ///use choose effect to render matchlist display when matchlist is set
  return(
    <>
      <h1>CS Tracker</h1>
      <SearchMatch/>
      <DisplayMatches/>
    </>
  )
}

export default CSTracker;
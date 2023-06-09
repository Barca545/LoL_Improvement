import React from "react";
import './App.css';
import SearchMatch from './components/search';
import DisplayMatches from './components/match-display/match-display';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout"
import Home from './pages/Home'
import CSTracker from './pages/CS-Tracker'
import NoPage from "./pages/no-page";///this seems like the wrong file name? Should be uppercase
import VODReviews from "./pages/VOD-Review";
import ProgressTracker from "./pages/Progress-Tracker";
import MatchInfo from "./pages/MatchInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'element={<Layout/>}>  
          <Route index element={<Home/>}/>
          <Route path='/cs-tracker'element={<CSTracker/>}/>
          <Route path="/vod-reviews" element={<VODReviews/>}/>
          <Route path="/progress-tracker" element={<ProgressTracker/>}/>
          <Route path='/match-info' element={<MatchInfo/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

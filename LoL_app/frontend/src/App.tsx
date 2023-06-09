import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout"
import Home from './pages/Home'
import CSTracker from './pages/CS-Tracker'
import NoPage from "./pages/NoPage";///this seems like the wrong file name? Should be uppercase
import VODReviews from "./pages/VOD-Review";
import ProgressTracker from "./pages/Progress-Tracker";
import MatchInfo from "./pages/MatchInfo";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";

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
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

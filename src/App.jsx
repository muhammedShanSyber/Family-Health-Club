import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./signup.jsx";
import Doctor_portal from "./Doctor";
import Userdashboard from './Userdashboard';
import Admindashboard from './Admindashboard.jsx';
import Docdashboard from './Docdashboard.jsx';
import MarqueeDoctorList from './MarqueeDoctorList.jsx';
import Admin from './admin.jsx';
import Feed from './Feed.jsx';
import './buttoncomm.css'
import './admindashboard.css';
import Map from './map.jsx'
import RoomPage from './room/RoomPage.jsx';
import Logo from './assets/Icon.jpeg';
require('dotenv').config();
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.STRIPE_KEY);

function App() {
  return (
    <>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/doctor" element={<Doctor_portal />} />
            <Route path="/Userdashboard" element={<Userdashboard />} />
            <Route path="/Docdashboard" element={<Docdashboard />} />
            <Route path="/Admindashboard" element={<Admindashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path='/room/:roomId' element={<RoomPage/>}/>
            <Route path='/room/:roomId/back' element={<Doctor_portal/>}/>
          </Routes>
         
        </main>
      </div>
    </>
  );
}

function Home() {
  return (
    <>
      <header className="header">
        <span className="title">
        <img src={Logo} alt="Logo" width={50} height={50} />
         <b style={{fontSize:'55px'}}> Family Health Hub</b>
          </span>
        <div className="header-buttons">
          <Link to="/doctor" className="doc-portal-btn">Doctors Portal</Link>
          <Link to="/login" className="user-login">Login</Link>
          <Link to="/signup" className="user-register">Sign Up</Link>
        </div>
      </header>
      <div >

        <b style={{fontSize:"30px", marginLeft:"130px", marginBottom:'0'}}>Breaking News</b>
        <div className="trending-block">
          <Feed />
        </div>
        <b style={{fontSize:"30px", marginLeft:"130px", marginBottom:'0'}}>Top Doctors</b>
        <div className="top-doc-block">
          <MarqueeDoctorList />
        </div>
      </div>
      <div>
        <Map />
      </div>

      <footer className="footer">
        <div className="social-media-links">
          <a style={{marginLeft:"620px"}} href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <b style={{marginLeft:"360px"}}>contact no : YOUR CONTACT NUMBER</b> 
        </div>
      </footer>
    </>

  );
}

export default App;

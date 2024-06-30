import React, { useState } from 'react';
import backgroundImage from './assets/loginbackground.jpg';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import './buttoncomm.css'
require('dotenv').config();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.SERVER_URL}/login`, {
        email: email,
        password: password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.userId);
      console.log(response.data);
      const userName = response.data.name;
      const userId = response.data.userId;
      navigate('/Userdashboard', { state: { name: userName , userID : userId } });
    } catch (error) {
      console.error('Error logging in:', error.response.data);
    }
  }
  return (
    <>
      <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
        <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h2>User Login</h2>
          <form onSubmit={handleSubmit} id="login-submit">
            <div>
              <input className='inputbox'
                type='email'
                placeholder="Email"
                style={{ marginBottom: '10px', width: '95%' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input className='inputbox'
                type='password'
                placeholder="Password"
                style={{ marginBottom: '10px', width: '95%' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div style={{ textAlign: 'right', marginBottom: '10px' }}>
              <Link to="/" style={{ marginRight: '10px' }}>go to home</Link>
              <button className='btn-common' style={{ marginRight: '10px' }}>Login</button>
              <Link to="/Signup" >New User</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;

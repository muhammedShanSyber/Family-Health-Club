// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import backgroundImage from './assets/loginbackground.jpg';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
// import './buttoncomm.css'
// require('dotenv').config();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/login', {
        email: email,
        password: password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.userId);
      console.log(response.data);
      const userName = response.data.name;
      const userId = response.data.userId;
      navigate('/Userdashboard', { state: { name: userName, userID: userId } });
    } catch (error) {
      console.error('Error logging in:', error.response.data);
    }
  }
  return (
    <>
      <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
        <div className='rounded-lg p-5 w-[500px] border border-solid border-gray-300'>
          <h2>User Login</h2>
          <form onSubmit={handleSubmit} id="login-submit">
            <div>
              <input className='w-full p-2.5 mt-2.5 rounded text-lg bg-transparent filter blur-0 transition-all duration-300'
                type='email'
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input className='w-full p-2.5 mt-2.5 rounded text-lg bg-transparent filter blur-0 transition-all duration-300'
                type='password'
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='text-right ' >
              <Link to="/" className='border-none bg-[#2e8bff] rounded text-xs font-bold text-white px-4 p-1.5 hover:bg-[#2e8bff] hover:border-[#2e8bff] hover:shadow-md hover:shadow-[0_8px_12px_rgba(0,0,0,0.2),0_0_20px_#2e8bff]
 mr-2.5'>back</Link>
              <button className='border-none bg-[#2e8bff] rounded text-xs font-bold text-white px-4 p-1.5 hover:bg-[#2e8bff] hover:border-[#2e8bff] hover:shadow-md hover:shadow-[0_8px_12px_rgba(0,0,0,0.2),0_0_20px_#2e8bff]
 mr-2.5 mt-3'>Login</button>
              <Link to="/Signup" className='border-none bg-[#2e8bff] rounded text-xs font-bold text-white px-4 p-1.5 hover:bg-[#2e8bff] hover:border-[#2e8bff] hover:shadow-md hover:shadow-[0_8px_12px_rgba(0,0,0,0.2),0_0_20px_#2e8bff]
' >New User</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;

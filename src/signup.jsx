import React, { useState } from 'react'
import backgroundImage from './assets/loginbackground.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './buttoncomm.css'
// require('dotenv').config();

function Signup() {

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpass] = useState('')
  const [age, setage] = useState('')
  const [gender, setGender] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(email, password, name, age, gender)
      const response = await axios.post(`http://localhost:3002/register`, {
        name: name,
        email: email,
        password: password,
        age: age,
        gender: gender
      });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  }

  return (
    <>
      <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
        <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h2>User Sign Up</h2>
          <form id="submit" onSubmit={handleSubmit}>
            <div>
              <input
                className='inputbox'
                type='name'
                value={name}
                placeholder="Full Name"
                style={{ marginBottom: '10px', width: '95%' }}
                onChange={(e) => setname(e.target.value)}
                required />
            </div>
            <div>
              <input
                className='inputbox'
                type='email'
                placeholder="Email"
                value={email}
                style={{ marginBottom: '10px', width: '95%' }}
                onChange={(e) => setemail(e.target.value)}
                required />
            </div>
            <div>
              <input className='inputbox' type='password'
                placeholder="password" 
                minLength={8}
                value={password}
                style={{ marginBottom: '10px', width: '95%' }}
                onChange={(e) => setpass(e.target.value)}
                required />
            </div>
            <div>
              <input className='inputbox'
                type='number'
                placeholder="Age"
                value={age}
                style={{ marginBottom: '10px', width: '95%' }}
                onChange={(e) => setage(e.target.value)}
                required />
            </div>
            <div>

              <select style={{ color: 'gray' }} className='inputbox' name="gender" id="gender" value={gender} onChange={(e) => { setGender(e.target.value); e.target.style.color = '' }} required>
                <option value="" disabled selected>Select Gender</option>
                <option style={{ color: 'black' }} value="Male">Male</option>
                <option style={{ color: 'black' }} value="Female">Female</option>
              </select>
            </div>
            <div style={{ marginTop: '10px' }}>
              <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                <Link to="/" style={{ marginRight: '10px', textDecoration: 'none', backgroundColor: '#2e8bff', padding: '5px', borderRadius: '5px', color: 'white', fontSize: '12px', fontWeight: 'bold' }}>Go to home </Link>
                <Link to="/Login" style={{ textDecoration: 'none', backgroundColor: '#2e8bff', padding: '5px', borderRadius: '5px', color: 'white', fontSize: '12px', fontWeight: 'bold' }} >Already a User </Link>
                <button type='submit' className='btn-common' style={{ marginRight: '10px' }}>Sign Up</button>

              </div>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Signup;

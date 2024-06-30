import React, { useState } from 'react'
import backgroundImage from './assets/loginbackground.jpg';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
require('dotenv').config();
import './buttoncomm.css'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.SERVER_URL}/doclogin`, {
                email: email,
                password: password,
            });
            console.log(response.data);
            const docuserName = response.data.name;
            console.log(docuserName);
            navigate('/Docdashboard', { state: { name: docuserName, id: response.data.id } });
        } catch (error) {
            console.error('Error logging in as doctor:', error.response.data);
        }
    }

    return (
        <>
            <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
                <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <h2>Doctor's Portal</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input className='inputbox'
                                type='email'
                                value={email}
                                placeholder="Email"
                                style={{ marginBottom: '10px', width: '95%' }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input className='inputbox'
                                type='password'
                                value={password}
                                placeholder="Password"
                                style={{ marginBottom: '10px', width: '95%' }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                            <Link to="/admin" style={{ marginRight: '10px', textDecoration: 'none', backgroundColor: '#2e8bff', padding:'5px' , borderRadius:'5px', color:'white', fontSize:'12px', fontWeight:'bold' }}>Admin Portal</Link>
                            <Link to="/" style={{ marginRight: '10px', textDecoration: 'none', backgroundColor: '#2e8bff', padding:'5px' , borderRadius:'5px', color:'white', fontSize:'12px', fontWeight:'bold' }}>go to home</Link>
                            <button className='btn-common' style={{ marginRight: '10px' }}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;

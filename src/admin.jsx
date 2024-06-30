import React, { useState } from 'react'
import backgroundImage from './assets/loginbackground.jpg';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
require('dotenv').config();

function Admin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.SERVER_URL}/adlogin`, {
                username: username,
                password: password,
            });
            console.log(response.data);
            navigate('/Admindashboard');
        } catch (error) {
            console.error('Error logging in as admin:', error.response.data);
        }
    }

    return (
        <>
            <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
                <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <h2>Admin Portal</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type='text'
                                value={username}
                                placeholder="Username"
                                style={{ marginBottom: '10px', width: '100%' }}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type='password'
                                value={password}
                                placeholder="Password"
                                style={{ marginBottom: '10px', width: '100%' }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                            <Link to="/" style={{ marginRight: '10px' }}>go to home</Link>
                            <button style={{ marginRight: '10px' }}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Admin;

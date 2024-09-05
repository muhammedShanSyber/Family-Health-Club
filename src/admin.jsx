// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import backgroundImage from './assets/loginbackground.jpg';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
// require('dotenv').config();

function Admin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3002/adlogin`, {
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
                <div className='rounded-lg p-5 w-[500px] border border-solid border-gray-300'>
                    <h2>Admin Portal</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type='text'
                                value={username}
                                placeholder="Username"
                                className='w-full p-2.5 mt-2.5 rounded text-lg bg-transparent filter blur-0 transition-all duration-300'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type='password'
                                value={password}
                                placeholder="Password"
                                className='w-full p-2.5 mt-2.5 rounded text-lg bg-transparent filter blur-0 transition-all duration-300'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='text-right '>
                            <Link to="/" className='border-none bg-[#2e8bff] rounded text-xs font-bold text-white px-4 p-1.5 hover:bg-[#2e8bff] hover:border-[#2e8bff] hover:shadow-md hover:shadow-[0_8px_12px_rgba(0,0,0,0.2),0_0_20px_#2e8bff]
 mr-2.5' >back</Link>
                            <button className='border-none bg-[#2e8bff] rounded text-xs font-bold text-white px-4 p-1.5 hover:bg-[#2e8bff] hover:border-[#2e8bff] hover:shadow-md hover:shadow-[0_8px_12px_rgba(0,0,0,0.2),0_0_20px_#2e8bff]
'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Admin;

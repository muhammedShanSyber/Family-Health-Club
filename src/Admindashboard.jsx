import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorList from './DoctorList';
import UserList from './UserList';
import Feed from './Feed';
import AddFeedModal from './AddFeedModal';
import './admindashboard.css';
import './Feed.css'
require('dotenv').config();

function Admindashboard() {
    const navigate = useNavigate();
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalDoctors, setTotalDoctors] = useState(0);
    const [showAddFeedModal, setShowAddFeedModal] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.SERVER_URL}/totalUsers`)
            .then(response => {
                setTotalUsers(response.data.totalUsers);
            })
            .catch(error => {
                console.error('Error fetching total users:', error);
            });

        axios.get(`${process.env.SERVER_URL}/totalDoctors`)
            .then(response => {
                setTotalDoctors(response.data.totalDoctors);
            })
            .catch(error => {
                console.error('Error fetching total doctors:', error);
            });
    }, []);

    const handleAddFeed = () => {
        setShowAddFeedModal(true);
    };

    const handleAddFeedItem = async (newFeedItemData) => {
        try {
            await axios.post(`${process.env.SERVER_URL}`, newFeedItemData);
            setShowAddFeedModal(false);
            window.location.reload();
        } catch (error) {
            console.error('Error adding feed item:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${process.env.SERVER_URL}/logout`);
            console.log('Logout response:', response); // Log the response object

            localStorage.removeItem('token');
            navigate('/admin');
        } catch (error) {
            console.error('Error logging out:', error.response ? error.response.data : error.message);
            // If there's an error, still proceed with logging out
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    return (
        <>
            <div className="admdash">
                <div className='adminheader'>Admin<button onClick={handleLogout} className='admin-logout'>logout</button></div>
                <div className='common-box box'>Total Users: {totalUsers}</div>
                <div className='common-box box'>Total Doctors: {totalDoctors}</div>
                <div style={{ marginTop: '30px' }}></div>
                <DoctorList />
                <div style={{ marginTop: '30px' }}></div>
                <UserList />
                <div style={{ marginTop: '30px' }}></div>
                <div className='feedboxheader'><strong>Feed</strong> <button onClick={handleAddFeed} className='feed-btn'>Add</button></div>
                <div className='feedlistbox'><Feed isAdminDashboard={true} /> </div>
                {showAddFeedModal && <AddFeedModal onClose={() => setShowAddFeedModal(false)} onAddFeed={handleAddFeedItem} />}
            </div>
        </>
    );
}

export default Admindashboard;
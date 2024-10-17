import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorList from './DoctorList';
import UserList from './UserList';
import Feed from './Feed';
import AddFeedModal from './AddFeedModal';
import './admindashboard.css';
import './Feed.css'
// require('dotenv').config();

function Admindashboard() {
    const navigate = useNavigate();
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalDoctors, setTotalDoctors] = useState(0);
    const [showAddFeedModal, setShowAddFeedModal] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3002/totalUsers`)
            .then(response => {
                setTotalUsers(response.data.totalUsers);
            })
            .catch(error => {
                console.error('Error fetching total users:', error);
            });

        axios.get(`http://localhost:3002/totalDoctors`)
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
            await axios.post(`http://localhost:3002`, newFeedItemData);
            setShowAddFeedModal(false);
            window.location.reload();
        } catch (error) {
            console.error('Error adding feed item:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post(`http://localhost:3002/logout`);
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
                <img src="src/assets/top-view-hands-holding-green-gua-sha.jpg" alt="" className='z-0 w-full bg-cover ' />
                <div className='text-white text-6xl  '>Admin Dashboard
                    <button className='inline-block font-bold border-2 bg-transparent absolute r-[10px] p-[6px] px-[18px]' onClick={handleLogout}>Logout</button></div>
                <div className='w-60 bg-[#2e8bff] transition-shadow duration-300 ease-in-out
 text-center inline-flex items-center justify-items-center justify-center text-white rounded h-40 ml-2.5 relative shadow-[0_4px_8px_rgba(0,0,0,0.1)]
 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:animate-[cardAnimation_0.5s_ease]'>Total Users: {totalUsers}</div>
                <div className='mt-1 w-60 bg-[#2e8bff] transition-shadow duration-300 ease-in-out
 text-center inline-flex items-center justify-items-center justify-center text-white rounded h-40 ml-2.5 relative shadow-[0_4px_8px_rgba(0,0,0,0.1)]
 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:animate-[cardAnimation_0.5s_ease]'>Total Doctors: {totalDoctors}</div>
                <div className='mt-[30px]' />
                <DoctorList />
                <div className='mt-[30px]' />
                <UserList />
                <div className='mt-[30px]' />
                <div className='feedboxheader'><strong>Feed</strong> <button onClick={handleAddFeed} className='border-2 inline-block rounded ml-[90%] p-[6px] px-[48px] font-bold'>Add</button></div>
                <div className='feedlistbox'><Feed isAdminDashboard={true} /> </div>
                {showAddFeedModal && <AddFeedModal onClose={() => setShowAddFeedModal(false)} onAddFeed={handleAddFeedItem} />}
            </div>
        </>
    );
}

export default Admindashboard;
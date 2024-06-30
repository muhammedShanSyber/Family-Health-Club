import React, { useEffect, useState } from 'react';
import axios from 'axios';
require('dotenv').config();

function ProfileView({ userId, onClose }) {
    const [userDetails, setUser] = useState('');
    const [fmembers , setFmembers] = useState([]);
    useEffect(() => {
        console.log(userId);
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${process.env.SERVER_URL}/user`, {
                    params: { _id: userId }
                });
                setUser(response.data.user);
                console.log(response.data.user);
                console.log(userDetails);
                setFmembers(response.data.user.fmembers)
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };
        fetchUser();

    }, [userId]);

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>My Profile</h3>
                {/* Your Account id : {userId} <br /> */}
                Your Name : {userDetails.name} <br />
                Your Age : {userDetails.age}  <br />
                Your Gender : {userDetails.gender}  <br />
                Your Email : {userDetails.email}  <br />
                {/* Your Password : {userDetails.password} <br /> */}
                Total Family Members in Your Family : {fmembers.length}  <br />
                 Detailed View : {fmembers.map(member=> member.name + ', ')}
                <br />
            </div>
        </div>
    );
}

export default ProfileView;
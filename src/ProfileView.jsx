import { useEffect, useState } from 'react';
import axios from 'axios';
// require('dotenv').config();


function ProfileView({ userId, onClose }) {
    const [userDetails, setUser] = useState('');
    const [fmembers , setFmembers] = useState([]);
    useEffect(() => {
        console.log(userId);
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/user`, {
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
                Your Current Password : <input type="password" name="" value={userDetails.password} id="" className='border-2 rounded-md w-fit h-8'/> <button>view</button>
                <br />
                Total Family Members in Your Family : {fmembers.length}  <br />
                 Detailed View : {fmembers.map(member=> member.name + ', ')}
                <br />
            </div>
        </div>
    );
}

export default ProfileView;
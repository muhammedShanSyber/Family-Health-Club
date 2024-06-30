import React, { useState } from 'react';
import axios from 'axios';
import './AddFamilyMember.css'
require('dotenv').config();

function AddFamilyMember({ userId, onClose }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [bloodgroup, setBloodgroup] = useState('');
    const [error, setError] = useState('');

    const handleSaveFamilyMember = async () => {
        try {
            console.log(userId)
            const response = await axios.post(`${process.env.SERVER_URL}/fmembers`, {
                userId,
                name,
                age,
                email,
                gender,
                bloodgroup
            });

            console.log('New family member saved:', response.data);
            onClose();
            window.location.reload(); // Refresh page to update family members list
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Failed to add family member. Please try again later.');
            }
            console.error('Error adding family member:', error);
        }
        
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add Family Member</h2>
                {error && <div className="error">{error}</div>}
                
                <input type="text" className='inputbox' placeholder='Enter Family Member Name' value={name} onChange={(e) => setName(e.target.value)} />
                <br />
              
                <input type="number" className='inputbox' placeholder='Enter the Age' value={age} onChange={(e) => setAge(e.target.value)} />
                <br />
                
                <input type="email" className='inputbox' placeholder='Add Family Member Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <input type="text" className='inputbox'  placeholder="Enter Gender" name="" id="" value={gender} onChange={(e)=> setGender(e.target.value)}/> <br />
                <input type="text" className='inputbox' placeholder='Enter Blood Group' name="" id="" value={bloodgroup} onChange={(e)=> {setBloodgroup(e.target.value)}}/> <br />
                <button className='btn-common' onClick={handleSaveFamilyMember}>Add Member</button>
            </div>
        </div>
    );
}

export default AddFamilyMember;

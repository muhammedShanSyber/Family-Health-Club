import React, { useState } from 'react';
import axios from 'axios';
import './buttoncomm.css'
import './AddFeedModal.css';
// require('dotenv').config();

function AddFeedModal({ onClose }) {
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');

    const handleSave = async () => {
        try {
            const response = await axios.post(`http://localhost:3002/feed`, {
                heading,
                description,
                time: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString()
            });
            console.log('New feed item added:', response.data);
            onClose(); 
        } catch (error) {
            console.error('Error adding feed item:', error);
        }
    };

    const handleCancel = () => {
        onClose(); 
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleCancel}>&times;</span>
                <h3>Add New Feed</h3>
                <form>
                    <input className='inputbox' placeholder='Enter News Heading' type="text" value={heading} onChange={(e) => setHeading(e.target.value)} required/> <br />
                    <textarea className='inputbox' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} required></textarea> <br />
                    <button className='btn-common' type="button" onClick={handleSave}>Save</button>
                    <button className='btn-common' type="button" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default AddFeedModal;

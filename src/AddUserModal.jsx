import React, { useState } from 'react';
import './AddUserModal.css';
import './buttoncomm.css'
// require('dotenv').config();

function AddUserModal({ onSave, onCancel }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');

    const handleSave = () => {
        onSave({ name, email, password, age });
        setName('');
        setEmail('');
        setPassword('');
        setAge('');
        setGender('');
    };

    const handleClose = () => {
        onCancel();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <h2>Add User</h2>
                <input className='inputbox' type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /> <br />
                <input className='inputbox' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /> <br />
                <input className='inputbox' type="password" placeholder="Password" value={password} minLength={8} onChange={(e) => setPassword(e.target.value)} required /> <br />
                <input className='inputbox' type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required /> <br />
                <select style={{ color: 'gray' }} className='inputbox' name="gender" id="gender" value={gender} onChange={(e) => { setGender(e.target.value); e.target.style.color = '' }} required>
                    <option value="" disabled selected>Select Gender</option>
                    <option style={{ color: 'black' }} value="Male">Male</option>
                    <option style={{ color: 'black' }} value="Female">Female</option>
                </select>

                <div className="button-container">
                    <button className='btn-common' onClick={handleSave}>Save User</button>
                    <button className='btn-common' onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default AddUserModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUserModal from './AddUserModal';
import './buttoncomm.css';
import { IoPersonRemoveSharp } from "react-icons/io5";
import './UserList.css'
require('dotenv').config();

function UserList() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.SERVER_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    const handleAddUser = async (userData) => {
        try {
            await axios.post(`${process.env.SERVER_URL}/addUser`, userData);
            fetchUsers();
            setShowModal(false);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleRemoveUser = async (userId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            try {
                await axios.delete(`${process.env.SERVER_URL}/users/${userId}`);
                fetchUsers();
            } catch (error) {
                console.error('Error removing user:', error);
            }
        }
    };

    return (
        <div>
            <strong> List Of Users</strong>
            <button className='userlist-btn' onClick={toggleModal}>Add User</button>
            {showModal && (
                <AddUserModal
                    onSave={handleAddUser}
                    onCancel={toggleModal}
                />
            )}
            {users.map((user) => (
                <div key={user._id} style={{
                    marginTop:'5px',
                    marginRight: '10px',
                    marginLeft:'10px',
                    backgroundColor: 'gainsboro',
                    display: 'flex',
                    borderRadius:'5px',
                    alignItems: 'center',
                    justifyContent:'space-between',
                    height: '30px'
                    
                }}>
                    <div style={{marginLeft:'10px'}}> <span>{user.name}</span></div>
                    <div style={{marginRight:'10px'}}><button className='btn-common' onClick={() => { console.log(user._id); handleRemoveUser(user._id); }}><IoPersonRemoveSharp /> Remove
                    </button></div>
                   
                    
                </div>
            ))}
        </div>
    );
}

export default UserList;

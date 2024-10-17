import { useState, useEffect } from 'react';
import axios from 'axios';
import AddUserModal from './AddUserModal';
import './buttoncomm.css';
import { IoPersonRemoveSharp } from "react-icons/io5";
// import './UserList.css'
// require('dotenv').config();

function UserList() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3002/users`, {
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
            await axios.post(`http://localhost:3002/addUser`, userData);
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
                await axios.delete(`http://localhost:3002/users/${userId}`);
                fetchUsers();
            } catch (error) {
                console.error('Error removing user:', error);
            }
        }
    };

    return (
        <div>
            <strong> List Of Users</strong>
            <button className='border-2 inline-block rounded ml-[90%] p-[6px] px-[40px] font-bold' onClick={toggleModal}>Add User</button>
            {showModal && (
                <AddUserModal
                    onSave={handleAddUser}
                    onCancel={toggleModal}
                />
            )}
            {users.map((user) => (
                <div key={user._id} className='bg-slate-500 mt-[5px] mr-[10px]  ml-[10px] flex justify-between h-[50px] border rounded-lg' style={{
                    alignItems: 'center',
                }}>
                    <div className='ml-[10px]'>
                        <span className='text-white font-bold'>{user.name}</span>
                    </div>
                    <div className='mr-[10px]'>
                        <button className='border-2 bg-transparent rounded-md px-8 font-bold text-white' onClick={() => { console.log(user._id); handleRemoveUser(user._id); }}><IoPersonRemoveSharp /> Remove</button>
                    </div>


                </div>
            ))}
        </div>
    );
}

export default UserList;

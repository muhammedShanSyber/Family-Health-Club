import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddDoctorModal from './AddDoctorModal';
import './DoctorList.css'
require('dotenv').config();

function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.SERVER_URL}/doctors`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleAddDoctor = async (doctorData) => {
        try {
            await axios.post(`${process.env.SERVER_URL}/addDoctor`, doctorData);
            fetchDoctors();
            setShowModal(false);
        } catch (error) {
            console.error('Error adding doctor:', error);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleRemoveDoctor = async (doctorId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this doctor?');
        if (confirmDelete) {
            try {
                await axios.delete(`${process.env.SERVER_URL}/doctors/${doctorId}`);
                fetchDoctors();
            } catch (error) {
                console.error('Error removing doctor:', error);
            }
        }
    };

    return (
        <div>
            <strong>List Of Doctors</strong>
            <button className='doclist-btn' onClick={toggleModal}>Add Doctor</button>
            {showModal && (
                <AddDoctorModal
                    onSave={handleAddDoctor}
                    onCancel={toggleModal}
                />
            )}
            {doctors.map((doctor) => (
                <div key={doctor._id} style={{
                    marginTop: '5px',
                    marginRight: '10px',
                    marginLeft: '10px',
                    backgroundColor: 'gainsboro',
                    display: 'flex',
                    borderRadius: '5px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '35px'
                }}>
                    <div style={{ marginLeft: '10px' }}>
                        <img src={doctor.image} alt={doctor.name} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                        <span>{doctor.name}</span></div>
                    <div style={{ marginRight: '10px' }}> <button className='btn-common' onClick={() => handleRemoveDoctor(doctor._id)}>Remove</button></div>
                </div>
            ))}
        </div>
    );
}

export default DoctorList;

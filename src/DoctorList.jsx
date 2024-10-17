// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddDoctorModal from './AddDoctorModal';
// import './DoctorList.css'
// require('dotenv').config();

function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3002/doctors`, {
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
            await axios.post(`http://localhost:3002/addDoctor`, doctorData);
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
                await axios.delete(`http://localhost:3002/doctors/${doctorId}`);
                fetchDoctors();
            } catch (error) {
                console.error('Error removing doctor:', error);
            }
        }
    };

    return (
        <div>
            <strong>List Of Doctors</strong>
            <button className='border-2 inline-block rounded ml-[90%] p-[6px] px-[48px] font-bold' onClick={toggleModal}>Add Doctor</button>
            {showModal && (
                <AddDoctorModal
                    onSave={handleAddDoctor}
                    onCancel={toggleModal}
                />
            )}
            {doctors.map((doctor) => (
                <div key={doctor._id} className="bg-slate-500 mt-[5px] mr-[10px]  ml-[10px] flex justify-between h-[50px] border rounded-3xl" style={{

                    alignItems: 'center',

                }}>
                    <div className='ml-[10px]'>
                        <img src={doctor.image} alt={doctor.name} className='w-[30px] h-[30px] rounded-lg' />
                        <span className='text-white'>{doctor.name}</span></div>
                    <div className='mr-[10px]'> 
                        <button className='border-2 bg-transparent rounded-md px-8 font-bold text-white'  onClick={() => handleRemoveDoctor(doctor._id)}>Remove</button></div>
                </div>
            ))}
        </div>
    );
}

export default DoctorList;

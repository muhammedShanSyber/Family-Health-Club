import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";
import './MarqueeDoctorList.css';
require('dotenv').config();

function MarqueeDoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get(`${process.env.SERVER_URL}/doctors`);
            setDoctors(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleViewDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setSelectedDoctor(null);
        setShowPopup(false);
    };

    return (
        <div>
            <marquee behavior="scroll" direction="left">
                {doctors.map(doctor => (
                    <div key={doctor._id} className="doctor-card">
                        <div className="profile-icon">
                            
                            {doctor.image == '' || doctor.image == null ? <CgProfile /> : <img src={doctor.image} width={50} height={50} style={{borderRadius:'30px'}} alt='no image found' />}
                        </div>
                        <div className="doctor-info">
                            <strong>{doctor.name}</strong><br />
                            <p>{doctor.specialization}</p>
                        </div>
                        <button className="view-btn btn-common" onClick={() => handleViewDoctor(doctor)}>View</button>
                    </div>
                ))}
            </marquee>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">

                        <h2>{selectedDoctor.name}</h2>
                        <strong>Email: {selectedDoctor.email}</strong>
                        <strong>Specialization: {selectedDoctor.specialization}</strong>
                        <strong>Hospital: {selectedDoctor.hospital}</strong>
                        <strong>Gender: {selectedDoctor.gender}</strong>
                        <strong>Payment UPI: {selectedDoctor.paymentupi}</strong>
                        <button className="close-btn btn-common" onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MarqueeDoctorList;

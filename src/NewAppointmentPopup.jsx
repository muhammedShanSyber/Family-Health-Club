/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewAppointmentPopup.css';
// require('dotenv').config();

// eslint-disable-next-line react/prop-types
function NewAppointmentPopup({ userId, onClose }) {
    const [familyMembers, setFamilyMembers] = useState([]);
    const [doctorFields] = useState(['Neurologist', 'Dentist', 'Gynecologist', 'Pediatrician', 'ENT Specialist', 'General Medicine']);
    const [selectedField, setSelectedField] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [remarks, setRemarks] = useState('');
    const [subject, setSubject] = useState('');

    const handleSaveAppointment = async () => {
        console.log(selectedDoctorId);
        try {
            const response = await axios.post(`http://localhost:3002/tickets`, {
                userId,
                member: selectedMember,
                doctor: selectedDoctor,
                doctorId: selectedDoctorId,
                subject,
                remarks
            });

            console.log('New ticket saved:', response.data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error saving ticket:', error);
        }
    }

    useEffect(() => {
        fetchFamilyMembers();
    }, []);

    const fetchFamilyMembers = async () => {
        try {
            console.log(userId)
            let newid = userId.toString()
            console.log(newid)
            const response = await axios.get(`http://localhost:3002/fmembers`,{
                params: { _id: newid }
            });
            console.log(response.data)
            setFamilyMembers(response.data.fmembers);
        } catch (error) {
            console.error('Error fetching family members:', error);
        }
    };

    useEffect(() => {
        console.log(selectedField);
        if (selectedField) {
            axios.get(`http://localhost:3002/fielddoctors?field=${selectedField}`)
                .then(response => {
                    console.log('Doctors response:', response.data); 
                    setDoctors(response.data);
                })
                .catch(error => {
                    console.error('Error fetching doctors:', error);
                });
        }
    }, [selectedField]);

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>New Appointment</h3>
                
                <select style={{color:'gray'}} className='inputbox'  value={selectedMember} onChange={(e) => {setSelectedMember(e.target.value); e.target.style.color=''}} required>
                    <option value="" disabled>Select Member</option>
                    {familyMembers.map((member, index) => (
                        <option style={{color:'black'}} key={index} value={member.name}>
                            {member.name}
                        </option>
                    ))}
                </select><br />

               
                <select style={{color:'gray'}} className='inputbox' value={selectedField} onChange={(e) => {setSelectedField(e.target.value); e.target.style.color='';}} required>
                    <option value="" disabled>Select Doctor Field</option>
                    {doctorFields.map(field => (
                        <option style={{color:'black'}} key={field} value={field}>{field}</option>
                    ))}
                </select><br />

               
                <select style={{color:'gray'}} className='inputbox' name={selectedDoctorId} value={selectedDoctor} onChange={(e) => {
                    let string = e.target.value;
                    let docId = string.split(" ");
                    console.log(docId);
                    setSelectedDoctor(docId[0]);
                    setSelectedDoctorId(docId[1]);
                    e.target.style.color='';
                }}>
                    <option value="" disabled>Select Your Doctor</option>
                    {doctors && doctors.length > 0 && doctors.map(doctor => (
                        <option style={{color:'black'}} key={doctor.email} value={doctor.name + " " + doctor._id} >{doctor.name}</option>
                    )
                    )}
                </select><br />

                <input className='inputbox' type='text' placeholder='Enter Subject' value={subject} onChange={(e) => setSubject(e.target.value)}></input><br />
                <textarea className='inputbox' placeholder='Enter Remarks' value={remarks} onChange={(e) => setRemarks(e.target.value)}></textarea><br />

                <button className='btn-common' onClick={handleSaveAppointment}>Save</button>
            </div>
        </div>
    );
}

export default NewAppointmentPopup;
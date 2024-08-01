import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './ViewAppointment.css';
import axios from 'axios';
// require('dotenv').config();

function ViewAppointment({ onClose, ticket, userId }) {
    const [userDetails, setUserDetails] = useState(null);
    const [familyMember, setFamilyMembers] = useState();
    const navigate = useNavigate();
    const [emailContent, setEmailContent] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const handleInputChange = (e) => {
        setEmailContent(e.target.value);
    };
    const sendEmail = async () => {
        try {
            const response = await axios.post(`/sendemail`, { content: emailContent });
            if (response.status === 200) {
                setEmailSent(true);
            } else {
                throw new Error('Failed to send email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };
    const confirmAppointment = () => {
        console.log('appointment logged')
    };

    const handleStartVideoCall = useCallback(() => {
        const patientid = ticket.userId
        console.log(patientid);
        navigate(`/room/${patientid}`);
        const notification = {
            patientid: patientid,
            message: 'Doctor Inviting For emergency Video Call.',
            buttonLabel: 'Start Video Call',
            onClickButton: confirmAppointment
        };
        localStorage.setItem('notification', JSON.stringify(notification));
    }, [navigate, userId, ticket.userId]);

    useEffect(() => {

        const fetchUserDetails = async () => {
            console.log(userId)
            try {
                const response = await axios.get(`${process.env.SERVER_URL}/users`, {
                    params: { _id: userId }
                });
                setUserDetails(response.data.users);
                console.log(response.data.users)
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        const fetchFamilyMembers = async () => {
            console.log(userId)
            try {
                const response = await axios.get(`${process.env.SERVER_URL}/fmembers`, {
                    params: { _id: userId }
                });
                console.log(response.data.fmembers)
                // let fmem = response.data.fmembers;
                let fmem = (response.data.fmembers).filter(obj => obj.name == ticket.member)
                console.log(fmem[0])
                // setFamilyMembers(response.data);
                setFamilyMembers(fmem[0]);
            } catch (error) {
                console.error('Error fetching family members:', error);
            }
        };


        fetchFamilyMembers();
        fetchUserDetails();
        console.log("User details:", userDetails);

    }, [userId]);

    return (
        <div className="modal2">
            <div className="modal-content2">
                <span className="close2" onClick={onClose}>&times;</span>
                <h2>Appointment Details</h2>
                <div>
                    {userDetails && userDetails.length > 0 && (
                        <>
                            <div key={userDetails[0]._id}>
                                Logged by: {userDetails[0].name} , Email: {userDetails[0].email} <br />
                            </div>
                        </>
                    )}
                    <hr />

                    <strong>Patient Name:</strong> {ticket.member} <br />
                    <strong>Subject:</strong> {ticket.subject} <br />
                    <strong>Remarks:</strong> {ticket.remarks} <br />
                    {/* User ID: {userId}  */}
                 {familyMember &&(
                    <>
                    <strong> age: </strong> {familyMember.age} <br />
                    <strong> email: </strong> {familyMember.email} <br />
                    <strong> gender: </strong> {familyMember.gender} <br />
                    <strong> BloodGroup:</strong> {familyMember.bloodgroup}
                    </>
                 )}
                </div>

                <br />
                {/* <div>
                    <textarea
                        value={emailContent}
                        onChange={handleInputChange}
                        placeholder="Enter email content"
                        rows="4"
                        cols="50"
                    /> <br />

                    {emailSent && <p>Email sent successfully!</p>}

                    <button onClick={sendEmail}>Send mail to the Patient</button>
                    <hr />
                </div> */}

                <button className='btn-common' onClick={handleStartVideoCall}>Start Instant Video Call with patient</button>

            </div>
        </div>
    );
}

export default ViewAppointment;

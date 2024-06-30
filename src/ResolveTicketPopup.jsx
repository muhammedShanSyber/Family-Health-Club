import React, { useState } from 'react';
import './ResolveTicketPopup.css';
import axios from 'axios';
require('dotenv').config();

function ResolveTicketPopup({ onClose, ticketId, userId, dId }) {
    const [closingRemarks, setClosingRemarks] = useState('');
    const [prescription, setPrescription] = useState('');
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const reviewTicket = () => {
        console.log("review working")
    };
    const sendAndRequest = () => {
        handleButtonClick()
        // console.log(userId)
        const notification = {
            userId,
            ticketId,
            closingRemarks,
            prescription,
            dId,
            message: "Please make payment to View the Doctor's Prescription",
            buttonLabel: 'Make Payment',
            onClickButton: reviewTicket
        };
        localStorage.setItem('notification', JSON.stringify(notification));
        onClose();
        window.location.reload();
    };

    const handleCheckboxChange = (e) => {
        setCheckboxChecked(e.target.checked);
    };

    const handleButtonClick = async () => {
        if (checkboxChecked) {
            // console.log("Checkbox is checked");
            try {
                console.log("here is the doctor id : " + userId)
                let yourId = userId;
                await axios.delete(`${process.env.SERVER_URL}/tickets/${ticketId}`, {
                    data: { yourId },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Appointment cancelled successfully');
            } catch (error) {
                console.error('Error cancelling appointment:', error);
            }
        } else {
            console.log("Checkbox is not checked");
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Resolve Ticket</h2>
                {/* <div>
                    <label>Ticket ID:</label>
                    <label>User ID:</label>
                    <label>Doctor ID:</label>
                </div> */}
                <span>{ticketId},</span><br />
                <span>{userId}</span> <br />
                <span>{dId}</span> <br />
                <label>Ticket Closing Remarks:</label>
                <input
                    className='inputbox'
                    type="text"
                    value={closingRemarks}
                    onChange={(e) => setClosingRemarks(e.target.value)}
                /> <br />
                <label>Prescription:</label>
                <textarea
                    className='inputbox'
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                ></textarea><br />
                Close Ticket : <input type="checkbox" checked={checkboxChecked} onChange={handleCheckboxChange} /> <br />

                <button style={{ marginLeft: '0px' }} className='btn-common' onClick={sendAndRequest}>Send prescriptions and request Money</button>
            </div>
        </div>
    );
}

export default ResolveTicketPopup;

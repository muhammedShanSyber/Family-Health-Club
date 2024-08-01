import React, { useState } from 'react';
import axios from 'axios';
// require('dotenv').config();

function PaymentUPIpopup({ onClose, dId }) {
    const [editedUpi, setEditedUpi] = useState('');

    const handleSave = async () => {
        try {
            console.log(dId)
            await axios.put(`/doctors/${dId}`, {
                paymentupi: editedUpi
            });
            onClose();
        } catch (error) {
            console.error('Error updating payment upi:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>Payment UPI Details</h3>
               
                <input className='inputbox' placeholder='Your UPI Id' type="text" value={editedUpi} onChange={(e) => setEditedUpi(e.target.value)} />
                <br />
                <button  className='btn-common' onClick={handleSave}>Update</button>
            </div>
        </div>
    );
}

export default PaymentUPIpopup;
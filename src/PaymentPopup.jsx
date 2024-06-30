import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import './PaymentPopup.css'
require('dotenv').config();

function PaymentPopup({ onClose, onSuccess, onFailure }) {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        country: ''
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (event) => {
        console.log()
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                name: formData.name,
                email: formData.email,
                address: {
                    city: formData.city,
                    country: formData.country,
                    line1: formData.address
                }
            }
            // Handle payment submission
            // This should be done in the parent component using stripe.createPaymentMethod
        });
        try {
            const result = await stripe.confirmUpiPayment('your_payment_upi_id', {
                amount: 50000, // Amount in paisa (Rs. 500)
                currency: 'inr',
                description: 'Payment for your service'
            });
    
            if (result.error) {
                onFailure(result.error.message);
            } else {
                onSuccess(result.paymentIntent);
            }
    
            if (error) {
                onFailure(error.message);
            } else {
                onSuccess(paymentMethod);
            }

        } catch (error) {
            onFailure(error.message);
        } finally {
            setProcessing(false); // Stop the loading animation
        }
        
    };

    return (
        <div className="modal3" style={modalStyle3}>
            <div className="modal-content3" style={modalContentStyle3}>
                {processing && (
                    <div className="overlay">
                        <div className="loader"></div>
                    </div>
                )}
                <span className="close3" style={closeButtonStyle3} onClick={onClose}>&times;</span>
                <h2 style={headerStyle3}>Make Payment</h2>
                <form onSubmit={handleSubmit}>
                    <div style={inputGroupStyle3}>

                        <input type="text" placeholder='Name' id="name" name="name" value={formData.name} onChange={handleChange} style={inputStyle3} />
                    </div>
                    <div style={inputGroupStyle3}>

                        <input type="email" placeholder='Email' id="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle3} />
                    </div>
                    <div style={inputGroupStyle3}>

                        <input type="text" placeholder='Address' id="address" name="address" value={formData.address} onChange={handleChange} style={inputStyle3} />
                    </div>
                    <div style={inputGroupStyle3}>

                        <input type="text" placeholder='City' id="city" name="city" value={formData.city} onChange={handleChange} style={inputStyle3} />
                    </div>
                    <div style={inputGroupStyle3}>
                        <input type="text" placeholder='Country' id="country" name="country" value={formData.country} onChange={handleChange} style={inputStyle3} />
                    </div>
                    <CardElement style={cardElementStyle3} />
                    <div style={{marginTop: '20px'}}></div>
                    <button style={buttonStyle3} type="submit">Pay Rs.500/- and View Doctor Prescription </button>

                </form>
            </div>
        </div>
    );
}

const modalStyle3 = {
    display: 'block',
    position: 'fixed',
    zIndex: '1000',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
};

const modalContentStyle3 = {
    position: 'relative',
    margin: '8% auto',
    width: '80%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '20px 40px 20px 20px ',
    borderRadius: '10px'
};

const closeButtonStyle3 = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '20px',
    color: '#aaa',
    cursor: 'pointer'
};

const headerStyle3 = {
    textAlign: 'center',
    marginBottom: '20px'
};

const inputGroupStyle3 = {
    marginBottom: '15px'
};

const inputStyle3 = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px'
};

const cardElementStyle3 = {
    marginTop: '15px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px'
};

const buttonStyle3 = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px'
};

export default PaymentPopup;

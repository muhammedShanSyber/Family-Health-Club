import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdCancel } from "react-icons/md";
import './styles_userdashboard.css';
import NewAppointmentPopup from './NewAppointmentPopup';
import ProfileView from './ProfileView';
import Map from './map.jsx'
import AddFamilyMember from './AddFamilyMember';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { VscNewFile } from "react-icons/vsc";
import { BsPersonFillAdd } from "react-icons/bs";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentPopup from './PaymentPopup';
import './noti.css'
import './buttoncomm.css'
// require('dotenv').config();


function Userdashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state ? location.state.name : '';
  const yourId = location.state ? location.state.userID : '';
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupAF, setShowPopupAF] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  const stripePromise = loadStripe('YOUR_STRIPE_KEY', { stripeAccount: 'YOUR_ACCOUNT_ID' });

  useEffect(() => {
    // Listen for changes to local storage
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleStorageChange = () => {
    // Retrieve and update notifications from local storage
    const notification = JSON.parse(localStorage.getItem('notification'));
    if (notification) {
      setNotifications(notification);
    }
  };
  // const triggervideoCall = (patientid) => {


  // }
  const handleNotificationButtonClick = (patientid) => {
    console.log(patientid)

    console.log('Notification button clicked');
    if (patientid) {
      navigate(`/room/${patientid}`);    }
    else {
      setShowPaymentPopup(true);
      console.log()
    }
  };


  const handlePaymentSuccess = (paymentMethod) => {
    console.log('Payment successful!', paymentMethod);
    // history.push('/success-page');
  };

  const handlePaymentFailure = (errorMessage) => {
    console.error('Payment failed:', errorMessage);
    // history.push('/failure-page');
  };
  // const sendPayment = async () => {
  //   setShowPaymentPopup(true);

  // }
  const handleNotificationClose = (notificationId) => {
    // Send notification to docdashboard
    const notificationData = {
      message: "user declined request"
    };
    sendNotificationToDocDashboard(notificationData);

    // Close the notification locally
    setNotifications(prevNotifications => prevNotifications.filter(notifications => notifications._id !== notificationId));

    // Clear the notification from localStorage
    const notificationsInStorage = JSON.parse(localStorage.getItem('notifications'));
    if (notificationsInStorage) {
      const updatedNotifications = notificationsInStorage.filter(notifications => notifications._id !== notificationId);
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    }
  };

  const sendNotificationToDocDashboard = (notificationData) => {
    localStorage.setItem('notificationToDocDashboard', JSON.stringify(notificationData));
  };

  useEffect(() => {
    // Fetch tickets from the server
    const fetchTickets = async () => {
      try {
        if (!yourId) {
          throw new Error('User ID is missing');
        }

        const response = await axios.get(`http://localhost:3002/tickets`, {
          params: { userId: yourId } // Pass user ID as 'userId' in query parameter
        });
        setTickets(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, [yourId]);

  const cancelAppointment = async (ticketId) => {
    console.log(yourId);
    try {

      await axios.delete(`http://localhost:3002/tickets/${ticketId}`, {
        data: { yourId },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setTickets(tickets.filter(ticket => ticket._id !== ticketId));
      console.log('Appointment cancelled successfully');
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const handleViewprofile = async () => {
    setViewProfile(true)
  }
  const handleCloseProfileView = async () => {
    setViewProfile(false)
  }
  const handleLogout = async () => {
    try {
      const response = await axios.post(`http://localhost:3002/logout`);
      console.log('Logout response:', response); // Log the response object

      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.response ? error.response.data : error.message);
      // If there's an error, still proceed with logging out
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const handleAddFamilyMember = () => {
    setShowPopupAF(true);
  };

  const handleNewAppointment = () => {
    setShowPopup(true);
  };

  const handleCloseModal = () => {
    setShowPopup(false);
  };

  const handleCloseModalAddFamily = () => {
    setShowPopupAF(false);
  }

  return (
    <>
      <div style={{
        paddingTop: '9px',
        color: 'white'
      }}
      >
        {/* <div className="notification-container">
          {notifications.length > 0 && (
            <div className="notification">
              <h2>Notifications:</h2>
              <ul>
                {notifications.map((notification, index) => (
                  <li key={index}>
                    <p>User ID: {notification.userId}</p>
                    <p>Ticket ID: {notification.ticketId}</p>
                    <p>Doc Id : {notification.dId}</p>
                    <p>Closing Remarks: {notification.closingRemarks}</p>
                    <p>Prescription: {notification.prescription}</p>
                    <button onClick={() => handleNotificationClose(notification._id)}>Close</button>
                    <button onClick={sendPayment}>Sent Payment and View Prescription</button>
                    {showPaymentPopup && (
                      <Elements stripe={stripePromise}>
                        <PaymentPopup onClose={() => setShowPaymentPopup(false)} />
                      </Elements>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div> */}
        <div style={{color:'black'}} className={`notification-container ${notifications ? 'show' : ''}`}>
          {notifications && (
            <div className="notification">
              <button className='closenoti' onClick={() => setNotifications(null)}>Clear</button>
              <b>Notification Bar</b>
              <p>{notifications.message}</p>
              {/* <p>User ID: {notifications.userId}</p> */}
              {/* <p>Closing Remarks: {notifications.closingRemarks}</p> */}
              {/* <p>Prescription: {notifications.prescription}</p> */}
              {/* <p>{notifications.patientid}</p> */}
              {notifications.buttonLabel && (
                <button onClick={() => handleNotificationButtonClick(notifications.patientid)}>{notifications.buttonLabel}</button>
              )}
              {showPaymentPopup && (
                <Elements stripe={stripePromise}>
                  <PaymentPopup onSuccess={handlePaymentSuccess} onFailure={handlePaymentFailure} onClose={() => setShowPaymentPopup(false)} />
                </Elements>
              )}
            </div>
          )}
        </div>

      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h1 style={{ marginBottom: '10px', marginTop: "0" }}>Welcome {name}!</h1>
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>

        </div>
      </div>

      <div className="main-content">
        <div className="appointment-list">
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <div key={ticket._id} className="ticket-item">
                <div style={{ marginLeft: '5px' }}>
                  {ticket.member} - {ticket.doctor} : {ticket.remarks}
                </div>
                <div style={{ marginRight: '5px' }}>
                  <button className='btn-common' onClick={() => cancelAppointment(ticket._id)}>Cancel Appointment <MdCancel /></button>

                </div>
              </div>
            ))
          ) : (
            <strong>No appointments available</strong>
          )}
        </div>

        <div className="sidebar">

          <button onClick={handleAddFamilyMember} className='btn-common'>Add Family Member <BsPersonFillAdd /> </button>
          <button className='btn-common' onClick={handleViewprofile} style={{ marginRight: '10px' }}><CgProfile /> My Profile</button>
          <button className='btn-common' onClick={handleLogout}><RiLogoutCircleRLine /> Logout  </button>
          <button style={{ marginTop: '10px' }} onClick={handleNewAppointment} className='btn-common'>New Appointment <VscNewFile /> </button>
        </div>
      </div>

      <Map />
      {showPopup && <NewAppointmentPopup userId={yourId} onClose={handleCloseModal} />}
      {showPopupAF && <AddFamilyMember userId={yourId} onClose={handleCloseModalAddFamily} />}
      {viewProfile && <ProfileView userId={yourId} onClose={handleCloseProfileView} />}
    </>
  );
}

export default Userdashboard;

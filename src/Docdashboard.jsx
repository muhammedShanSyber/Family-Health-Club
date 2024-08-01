import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles_userdashboard.css';
import axios from 'axios';
import DocView from './DocView';
import './buttoncomm.css';
import ViewAppointment from './ViewAppointment';
import ResolveTicketPopup from './ResolveTicketPopup';
import PaymentUPIpopup from './PaymentUPIpopup';
import './noti.css';
// require('dotenv').config();

function Docdashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state ? location.state.name : '';
  const id = location.state ? location.state.id : '';
  const [tickets, setTickets] = useState([]);
  const [showPopupViewAppointment, setShowPopupViewAppointment] = useState(false); // Updated state name
  const [showPopupResolveticket, setShowPopupResolveticket] = useState(false);
  const [showPopupupi, setShowPopupupi] = useState(false);
  const [notification, setNotification] = useState(null);
  const [ticketId, setTicketId] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [docId, setDocId] = useState('');
  const [viewProfile, setViewProfile] = useState(false);


  const handleLogout = async () => {
    try {
      const response = await axios.post(`http://localhost:3002/logout`);
      console.log('Logout response:', response); // Log the response object

      localStorage.removeItem('token');
      navigate('/doctor');
    } catch (error) {
      console.error('Error logging out:', error.response ? error.response.data : error.message);
      // If there's an error, still proceed with logging out
      localStorage.removeItem('token');
      navigate('/doctor');
    }
  };

  const handlerefresh = async () => {
    window.location.reload();
  }

  const handleupdateupi = async (doctorId) => {
    doctorId = tickets[0].doctorId;
    console.log(doctorId);
    setShowPopupupi(true)
    setDocId(doctorId);
  }

  const viewAppointment = (ticket) => { 
    setSelectedTicket(ticket);
    setUserId(ticket.userId);
    setShowPopupViewAppointment(true);
  }

  const resolveticket = (ticketId, userId, doctorId) => {
    doctorId = tickets[0].doctorId;
    console.log(doctorId);
    setShowPopupResolveticket(true);
    setTicketId(ticketId);
    setUserId(userId);
    setDocId(doctorId);
  }

  useEffect(() => {
    // Listen for notifications from userdashboard
    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, []);

  const handleStorageEvent = (event) => {
    if (event.key === 'notificationToDocDashboard') {
      // Handle the notification received from userdashboard
      const notificationData = JSON.parse(event.newValue);
      console.log("Notification from userdashboard:", notificationData);
      setNotification(notificationData);
    }
  };

  const handleNotificationClose = () => {
    // Clear the notification
    setNotification(null);
    // Clear the notification from localStorage
    localStorage.removeItem('notificationToDocDashboard');
  };

  const handleViewprofile = async () => {
    setViewProfile(true)
  }
  const handleCloseProfileView = async () => {
    setViewProfile(false)
  }

  const handleCloseModalViewAppointment = () => {
    setShowPopupViewAppointment(false)
  }
  const handleCloseModalResolveticket = () => {
    setShowPopupResolveticket(false)
    const doctorId = tickets[0].doctorId;
    console.log(doctorId);
  }
  const handleCloseModalUPI = () => {
    setShowPopupupi(false)
    const doctorId = tickets[0].doctorId;
    console.log(doctorId);
  }

  useEffect(() => {
    console.log(userId);
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${process.env.SERVER_URL}/appointments`, {
          params: { doctorId: id } // Pass user ID as 'userId' in query parameter
        });
        setTickets(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchAppointments();
  }, [id])

  return (
    <>
      <div>
        {notification && (
          <div className="notification">
            <p>{notification.message}</p>
            <button onClick={handleNotificationClose}>Close</button>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

        <h1 style={{ marginBottom: '20px' }}>Welcome Doctor {name}!</h1>
      </div>
      <div className="main-content">
        <div className="appointment-list">
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <div key={ticket._id} style={{ justifyContent: 'space-between' }} className="ticket-item">
                <div style={{ marginLeft: '10px' }}>
                  <div>{ticket.member} : </div>
                  {/* {ticket.docterId} */}
                </div>
                <div> {ticket.subject} </div>

                <div style={{ marginRight: '10px' }}>
                  <button className='btn-common' onClick={() => viewAppointment(ticket)} >View Appointment</button>
                  <button className='btn-common' onClick={() => resolveticket(ticket._id, ticket.userId, ticket.docterId)}>Resolve Ticket</button>
                </div>

              </div>
            ))
          ) : (
            <div>No tickets available</div>
          )}
        </div>

        <div className="sidebar">
          <button className='btn-common' onClick={handlerefresh} >Refresh</button>
          <button className='btn-common' onClick={() => handleupdateupi(docId)}>Update Your Payment UPI</button>
          <button className='btn-common' onClick={handleViewprofile} style={{ marginRight: '10px' }}>My Profile</button>
          <button className='btn-common' style={{ marginTop: '10px' }} onClick={handleLogout}>Logout</button>
        </div>
      </div>
      {showPopupViewAppointment && <ViewAppointment onClose={handleCloseModalViewAppointment} ticket={selectedTicket} userId={userId} />}

      {showPopupResolveticket && <ResolveTicketPopup onClose={handleCloseModalResolveticket} ticketId={ticketId} userId={userId} dId={docId} />}
      {showPopupupi && <PaymentUPIpopup onClose={handleCloseModalUPI} dId={docId} />}
      {viewProfile && <DocView userId={id} onClose={handleCloseProfileView} />}
    </>
  );
}

export default Docdashboard;

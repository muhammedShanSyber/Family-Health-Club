import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// import { MdCancel } from "react-icons/md";
// import './styles_userdashboard.css';
import NewAppointmentPopup from './NewAppointmentPopup';
import ProfileView from './ProfileView';
// import Map from './map.jsx'
import AddFamilyMember from './AddFamilyMember';
import { RiLogoutCircleRLine } from "react-icons/ri";
// import { CgProfile } from "react-icons/cg";
import { VscNewFile } from "react-icons/vsc";
import { BsPersonFillAdd } from "react-icons/bs";
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import PaymentPopup from './PaymentPopup';
import './noti.css'
import './buttoncomm.css'
// require('dotenv').config();

function Userdashboard({ userId, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state ? location.state.name : '';
  const yourId = location.state ? location.state.userID : '';
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupAF, setShowPopupAF] = useState(false);
  const [tickets, setTickets] = useState([]);
  // const [notifications, setNotifications] = useState([]);
  // const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);
  // const stripePromise = loadStripe('YOUR_STRIPE_KEY', { stripeAccount: 'YOUR_ACCOUNT_ID' });
  const [userDetails, setUser] = useState('');
  const [fmembers, setFmembers] = useState([]);

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


    console.log(yourId);
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/user`, {
          params: { _id: yourId }
        });
        setUser(response.data.user);
        console.log(response.data.user);
        console.log(userDetails);
        setFmembers(response.data.user.fmembers)
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchUser();

    // Listen for changes to local storage
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };


  }, [yourId]);

  const handleStorageChange = () => {
    // Retrieve and update notifications from local storage
    const notification = JSON.parse(localStorage.getItem('notification'));
    if (notification) {
      setNotifications(notification);
    }
  };

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

  const handleViewSingleprofile = async (Id) => {
    console.log('single profile view')
    console.log(Id)
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
      <div className='flex justify-center items-center' style={{ flexDirection: 'column' }}>
        <div className='flex'>
          <span className='text-black font-bold text-4xl '>Welcome {name}</span>
          <button className=' border-2 bg-transparent rounded-3xl px-8 font-bold text-black flex items-center' onClick={handleViewprofile} > {name}</button>
        </div>

      </div>

      <div className=" bg-[#bd4c4c] flex justify-between ">

        <div className=' w-[65%]'>

          <div className="w-full m-[30px] border-4 rounded-2xl border-[#68834E] p-6 bg-white ">
            <div className='justify-between flex'>
              <span className='font-bold text-3xl'>Family Members</span>
              <button onClick={handleAddFamilyMember} className=' bg-[#68834E] rounded-md px-8 font-bold text-white flex h-8 items-center'>Add Family Member <BsPersonFillAdd /> </button>
            </div>

            {fmembers.length > 0 ? (
              fmembers.map(member => (
                <div key={member._id} className="bg-white justify-between h-12 items-center flex border-4 rounded-lg border-[#68834E] mt-2">
                  <div className='ml-[5px] font-bold ' >
                    {member.name}
                  </div>
                  <div className='mr-[5px]'>
                    <button className=' rounded-lg  h-8 px-8 font-bold text-white bg-[#68834E] ' onClick={() => handleViewSingleprofile(member._id)}>View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <strong className='text-white font-bold text-2xl '>No appointments available</strong>
            )}
          </div>
          <div className="w-full m-[30px] border-4 rounded-2xl border-[#68834E] p-6 bg-white ">
            <div className='justify-between flex'>
              <span className='font-bold text-3xl'>Appointments</span>
              <button onClick={handleNewAppointment} className=' bg-[#68834E] rounded-md px-8 font-bold text-white flex h-8 items-center'>Add Appointment <VscNewFile /> </button>
            </div>

            {tickets.length > 0 ? (
              tickets.map(ticket => (
                <div key={ticket._id} className="bg-white justify-between h-12 items-center flex border-4 rounded-lg border-[#68834E] mt-2">
                  <div className='ml-[5px] font-bold ' >
                    {ticket.member} - {ticket.doctor} : {ticket.remarks}
                  </div>
                  <div className='mr-[5px]'>
                    <button className='mr-4 rounded-lg  h-8 px-8 font-bold text-white bg-[#68834E] ' onClick={() => cancelAppointment(ticket._id)}>View Profile</button>

                    <button className='border-2 rounded-lg  h-8 px-8 font-bold text-[#68834E]  border-[#68834E]' onClick={() => cancelAppointment(ticket._id)}>Cancel</button>

                  </div>
                </div>
              ))
            ) : (
              <strong className='text-white font-bold text-2xl '>No appointments available</strong>
            )}
          </div>

        </div>

        <div className="w-[32%] border-4 border-[#68834E] rounded-2xl bg-white">
          <span className='font-bold text-3xl m-10'>Messages</span>
          <button className='border-2 bg-transparent rounded-md px-8 font-bold text-white' onClick={handleLogout}><RiLogoutCircleRLine /> Logout  </button>

        </div>
      </div>

      {/* <Map /> */}
      {showPopup && <NewAppointmentPopup userId={yourId} onClose={handleCloseModal} />}
      {showPopupAF && <AddFamilyMember userId={yourId} onClose={handleCloseModalAddFamily} />}
      {viewProfile && <ProfileView userId={yourId} onClose={handleCloseProfileView} />}
    </>
  );
}

export default Userdashboard;

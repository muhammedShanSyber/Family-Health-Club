/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
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
  const current = new Date();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = daysOfWeek[current.getDay()];
  const date = `${dayName} - ${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


  const handleLogout = async (event) => {
    event.stopPropagation();
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

  // const handlerefresh = async () => {
  //   window.location.reload();
  // }

  // const handleupdateupi = async (doctorId) => {
  //   // doctorId = tickets[0].doctorId;
  //   console.log(doctorId);
  //   setShowPopupupi(true);
  //   setDocId(doctorId);
  // }

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
    console.log("View profile clicked.")
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
    console.log(id);
    const fetchAppointments = async () => {
      try {
        console.log(id)
        const response = await axios.get('http://localhost:3002/appointments', {
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
      <div className='bg-[#EDECEC] flex flex-row p-[0_27px_0_0]  box-sizing-border'>
        <div className="rounded-r-[25px] bg-[#68834E] relative m-[0_15px_0_0] flex flex-col items-center p-[37px_16px_30px_16px] w-[104px] box-sizing-border">
          <div className="m-[0_1px_56px_0] flex w-[39px] h-[39px] box-sizing-border">
            <img className="w-[39px] h-[39px]" />
          </div>
          <div className="m-[0_1px_795px_0] flex w-[39px] h-[39px] box-sizing-border">
            <img className="w-[39px] h-[39px]" />
          </div>
          <img className="self-end w-[64px] h-[28px]" />
        </div>
        <div className="relative m-[27px_0_29px_0] flex w-[1294px] h-[fit-content] box-sizing-border">
          <div className="relative flex flex-col  h-[fit-content] box-sizing-border">
            <div className="m-[0_0_18px_18px] flex flex-row justify-between w-[1276px] box-sizing-border">
              <div className="m-[1px_29px_0_0] inline-block  break-words font-['Inter'] font-bold text-[48px] tracking-[2.4px] text-[#232130]">
                Dashboard
              </div>
              <button onClick={handleViewprofile} className="shadow-[inset_1px_1px_2px_0px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_0px_rgba(177,177,177,0.5),-4px_4px_8px_0px_rgba(177,177,177,0.2),4px_-4px_8px_0px_rgba(177,177,177,0.2),-4px_-4px_8px_0px_rgba(255,255,255,0.9),4px_4px_10px_0px_rgba(177,177,177,0.9)] rounded-[50px] bg-[linear-gradient(135deg,#EDEDED,#FFFFFF)] relative m-[0_0_3px_0] flex flex-row justify-between p-[8px_8px_8px_17px] w-[285px] h-[fit-content] box-sizing-border">
                <div className="m-[8px_0_8px_0] flex w-[24px] h-[24px] box-sizing-border">
                  <button onClick={handleLogout}>
                  <img className="w-[22px] h-[24px]" />
                  </button>
                </div>
                <div className="flex flex-row box-sizing-border">
                  <div className="m-[2px_4.8px_3px_0] flex flex-col items-end box-sizing-border">
                    <span className="break-words font-['Inter'] font-semibold text-[16px] tracking-[0.8px] text-[#000000]">
                      {name}!
                    </span>
                    <span className="m-[0_0px_0_0px] break-words font-['Inter'] font-semibold text-[13px] tracking-[0.7px] text-[#A9A9A9]">
                      View Profile
                    </span>
                  </div>
                  <div className="rounded-[20px] bg-[url('assets/images/AvatarImage409.jpeg')] bg-[50%_50%] bg-cover bg-no-repeat w-[40px] h-[40px]">
                  </div>
                </div>
              </button>
            </div>
            <div className="m-[0_7.8px_9px_18px] flex flex-row justify-between w-[1268.2px] box-sizing-border">
              <span className="m-[0_19.5px_0_0] w-[349px] break-words font-['Inter'] font-semibold text-[32px] tracking-[1.6px] text-[#232130]">
                Today Appointments
              </span>
              <div className="m-[16px_0_4px_0] inline-block break-words font-['Inter'] font-medium text-[16px] tracking-[0.8px] text-[#232130]">
                {date}
              </div>
            </div>
            <div className="shadow-[-4px_4px_8px_0px_rgba(179,179,179,0.2),4px_-4px_8px_0px_rgba(179,179,179,0.2),-4px_-4px_8px_0px_rgba(255,255,255,0.9),4px_4px_10px_0px_rgba(179,179,179,0.9)] rounded-[14px] border-[1px_solid_rgba(169,169,169,0.1)] bg-[#F9F9F9] relative m-[0_0_15px_0] flex flex-row justify-between self-start p-[28px_20px_28px_16px] w-[295px] box-sizing-border">
              <span className="m-[0_14.5px_0_0] w-[178px] break-words font-['Inter'] font-semibold text-[24px] tracking-[1.2px] text-[#232130]">
                New Patients
              </span>
              <span className="break-words font-['Inter'] font-semibold text-[24px] tracking-[1.2px] text-[#232130]">
                35
              </span>
            </div>
            <div className="rounded-[14px] absolute left-[315px] top-[125px] flex flex-row justify-between p-[14px_20px_0_15px] w-[295px] box-sizing-border">
              <div className="shadow-[-4px_4px_8px_0px_rgba(179,179,179,0.2),4px_-4px_8px_0px_rgba(179,179,179,0.2),-4px_-4px_8px_0px_rgba(255,255,255,0.9),4px_4px_10px_0px_rgba(179,179,179,0.9)] rounded-[14px] border-[1px_solid_rgba(169,169,169,0.1)] bg-[#F9F9F9] absolute left-[50%] top-[0px] translate-x-[-50%] w-[295px] h-[85px]">
              </div>
              <span className="relative m-[0_43.5px_0_0] w-[178px] break-words font-['Inter'] font-semibold text-[24px] tracking-[1.2px] text-[#232130]">
                Pending Appointments
              </span>
              <div className="relative m-[14px_0_44px_0] inline-block break-words font-['Inter'] font-semibold text-[24px] tracking-[1.2px] text-[#232130]">
                35
              </div>
            </div>
            <div className="rounded-[14px] absolute top-[125px] right-[369px] flex flex-row justify-between p-[14px_20px_0_15px] w-[295px] box-sizing-border">
              <div className="shadow-[-4px_4px_8px_0px_rgba(177,177,177,0.2),4px_-4px_8px_0px_rgba(177,177,177,0.2),-4px_-4px_8px_0px_rgba(255,255,255,0.9),4px_4px_10px_0px_rgba(177,177,177,0.9)] rounded-[14px] border-[1px_solid_rgba(169,169,169,0.1)] bg-[linear-gradient(135deg,#EDEDED,#FFFFFF)] absolute left-[50%] top-[0px] translate-x-[-50%] w-[295px] h-[85px]">
              </div>
              <span className="relative m-[0_43.5px_0_0] w-[178px] break-words font-['Inter'] font-semibold text-[24px] tracking-[1.2px] text-[#232130]">
                Pending Transactions
              </span>
              <div className="relative m-[14px_0_44px_0] inline-block break-words font-['Inter'] font-semibold text-[24px] tracking-[1.2px] text-[#232130]">
                35
              </div>
            </div>
            <div className="relative m-[0_0_10px_0] flex w-[1294px] box-sizing-border">
              <div className="relative flex flex-row justify-between w-[1294px] h-[fit-content] box-sizing-border">
                <div className="shadow-[inset_-3px_3px_6px_0px_rgba(164,164,164,0.2),inset_3px_-3px_6px_0px_rgba(164,164,164,0.2),inset_-3px_-3px_6px_0px_rgba(255,255,255,0.9),inset_3px_3px_8px_0px_rgba(164,164,164,0.9)] rounded-[50px] border-[2px_solid_rgba(169,169,169,0.1)] bg-[#F9F9F9] relative p-[11px_18.4px_10px_18.4px] w-[553px] box-sizing-border">
                  <span className="break-words font-['Inter'] font-semibold text-[20px] tracking-[1px] text-[#A9A9A9]">
                    Search Appointments
                  </span>
                </div>
                <div className="flex flex-row box-sizing-border">
                  <button className="shadow-[-5px_5px_10px_0px_rgba(172,172,172,0.2),5px_-5px_10px_0px_rgba(172,172,172,0.2),-5px_-5px_10px_0px_rgba(255,255,255,0.9),5px_5px_13px_0px_rgba(172,172,172,0.9)] rounded-[15px] border-[1px_solid_rgba(169,169,169,0.1)] bg-[linear-gradient(135deg,#EDEDED,#FFFFFF)] relative m-[0_37px_0_0] flex flex-row p-[11px_22.9px_9px_16px] box-sizing-border">
                    <img className="m-[0_7px_1px_0] w-[24px] h-[24px]" />
                    <div className="m-[1px_0_0_0] inline-block break-words font-['Inter'] font-semibold text-[20px] tracking-[1px] text-[#232130]">
                      Appointment history
                    </div>
                  </button>
                  <button className="shadow-[-5px_5px_10px_0px_rgba(172,172,172,0.2),5px_-5px_10px_0px_rgba(172,172,172,0.2),-5px_-5px_10px_0px_rgba(255,255,255,0.9),5px_5px_13px_0px_rgba(172,172,172,0.9)] rounded-[15px] border-[1px_solid_rgba(169,169,169,0.1)] bg-[linear-gradient(135deg,#EDEDED,#FFFFFF)] relative flex flex-row p-[12px_0_9px_18px] w-[218px] box-sizing-border">
                    <div className="border-[1px_solid_rgba(169,169,169,0.1)] m-[0_11px_0_0] flex p-[3px_0_3px_0] w-[24px] h-[24px] box-sizing-border">
                      <img className="w-[22px] h-[16px]" />
                    </div>
                    <span className="border-[1px_solid_rgba(169,169,169,0.1)] break-words font-['Inter'] font-semibold text-[20px] tracking-[1px] text-[#232130]">
                      Add Patients
                    </span>
                  </button>
                </div>
              </div>
              <div className="shadow-[inset_1px_1px_2px_0px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_0px_rgba(204,204,204,0.5),-3px_3px_6px_0px_rgba(204,204,204,0.2),3px_-3px_6px_0px_rgba(204,204,204,0.2),-3px_-3px_6px_0px_rgba(255,255,255,0.9),3px_3px_8px_0px_rgba(204,204,204,0.9)] rounded-[22.5px] bg-[linear-gradient(135deg,#EDEDED,#FFFFFF)] absolute left-[563px] bottom-[0px] flex p-[9px_11px_11px_9px] w-[45px] h-[45px] box-sizing-border">
                <img className="w-[25px] h-[25px]" />
              </div>
            </div>

            <div className="shadow-[inset_1px_1px_2px_0px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_0px_rgba(166,165,165,0.5),-7px_7px_14px_0px_rgba(166,165,165,0.2),7px_-7px_14px_0px_rgba(166,165,165,0.2),-7px_-7px_14px_0px_rgba(255,255,255,0.9),7px_7px_18px_0px_rgba(166,165,165,0.9)] rounded-[14px] border-[3px_solid_rgba(104,131,78,0.7)] bg-[linear-gradient(135deg,#F9F8F8,#E1E0E0)] relative flex flex-row p-[20px_20.3px_20px_21px] w-[1294px] box-sizing-border">

              <div className="m-[0_25.2px_0_0] flex flex-col items-center w-[1207.3px] h-[fit-content] box-sizing-border">
                {tickets.length > 0 ? (
                  tickets.map(ticket => (
                    <div key={ticket._id} className="shadow-[-3px_3px_6px_0px_rgba(194,194,194,0.2),3px_-3px_6px_0px_rgba(194,194,194,0.2),-3px_-3px_6px_0px_rgba(255,255,255,0.9),3px_3px_8px_0px_rgba(194,194,194,0.9)] rounded-[50px] border-[1px_solid_rgba(169,169,169,0.25)] bg-[linear-gradient(135deg,#EDEDED,#FFFFFF)] relative m-[0_0_12px_0] flex flex-row justify-between p-[7px_7.1px_7px_8.6px] w-[1207.3px] box-sizing-border">
                      <div className="flex flex-row box-sizing-border">
                        <div className="rounded-[20px] border-[1px_solid_rgba(169,169,169,0.25)] bg-[url('assets/images/AvatarImage407.jpeg')] bg-[50%_50%] bg-cover bg-no-repeat m-[0_10.3px_0_0] w-[40.1px] h-[40px]">
                        </div>
                        <div className="border-[1px_solid_rgba(169,169,169,0.25)] m-[8px_0_8px_0] inline-block break-words font-['Inter'] font-semibold text-[20px] tracking-[1px] text-[#232130]">
                          {ticket.member}
                        </div>
                      </div>
                      <div className="m-[1px_0_1px_0] flex flex-row box-sizing-border">
                        <div> {ticket.subject} </div>
                        <div className="border-[1px_solid_rgba(169,169,169,0.25)] m-[10px_24.8px_9px_0] inline-block break-words font-['Inter'] font-semibold text-[16px] tracking-[0.8px] text-[#232130]">
                          12:30
                        </div>
                        <button onClick={() => viewAppointment(ticket)} className="shadow-[inset_1px_1px_2px_0px_rgba(114,144,86,0.3),inset_-1px_-1px_2px_0px_rgba(94,118,70,0.5),-1px_1px_2px_0px_rgba(94,118,70,0.2),1px_-1px_2px_0px_rgba(94,118,70,0.2),1px_1px_3px_0px_rgba(94,118,70,0.9)] rounded-[50px] border-[1px_solid_rgba(169,169,169,0.25)] bg-[#68834E] relative m-[0_11.7px_0_0] flex p-[6px_4.1px_8px_0] w-[187.3px] box-sizing-border">
                          <span className="border-[1px_solid_rgba(169,169,169,0.25)] break-words font-['Inter'] font-semibold text-[20px] tracking-[1px] text-[#F9F9F9]">
                            Overview
                          </span>
                        </button>
                        <button onClick={() => resolveticket(ticket._id, ticket.userId, ticket.docterId)} className="shadow-[inset_1px_1px_2px_0px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_0px_rgba(221,221,221,0.5),-5px_5px_10px_0px_rgba(221,221,221,0.2),5px_-5px_10px_0px_rgba(221,221,221,0.2),-5px_-5px_10px_0px_rgba(255,255,255,0.9),5px_5px_13px_0px_rgba(221,221,221,0.9)] rounded-[50px] border-[1px_solid_rgba(169,169,169,0.25)] bg-[#F5F5F5] flex p-[6px_16.4px_6px_15.8px] box-sizing-border">
                          <span className="break-words font-['Inter'] font-semibold text-[20px] tracking-[1px] text-[#232130]">
                            Close Ticket
                          </span>
                        </button>
                      </div>



                    </div>
                  ))
                ) : (
                  <div>No tickets available</div>
                )}
              </div>

              <div className="shadow-[inset_1px_-1px_2px_0px_rgba(255,255,255,0.3),inset_-1px_1px_2px_0px_rgba(203,203,203,0.5),-4px_-4px_8px_0px_rgba(203,203,203,0.2),4px_4px_8px_0px_rgba(203,203,203,0.2),-4px_4px_8px_0px_rgba(255,255,255,0.9),4px_-4px_10px_0px_rgba(203,203,203,0.9)] rounded-[14px] border-[3px_solid_#68834E] bg-[linear-gradient(135deg,#FFFFFF,#E8E8E8)] relative m-[1px_0_1px_0] flex p-[86.6px_3px_0_2px] w-[20.3px] h-[646px] box-sizing-border">
                <div className="shadow-[inset_1px_1px_2px_0px_rgba(113,143,85,0.3),inset_-1px_-1px_2px_0px_rgba(95,119,71,0.5),-1px_1px_2px_0px_rgba(95,119,71,0.2),1px_-1px_2px_0px_rgba(95,119,71,0.2),1px_1px_3px_0px_rgba(95,119,71,0.9)] rounded-[14px] bg-[linear-gradient(135deg,#637C4A,#6D8A52)] w-[99.9px] h-[15.2px]">
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div>
        {notification && (
          <div className="notification">
            <p>{notification.message}</p>
            <button onClick={handleNotificationClose}>Close</button>
          </div>
        )}
      </div>
      {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

        <h1 style={{ marginBottom: '20px' }}>Welcome Doctor {name}!</h1>
      </div> */}
      <div className="main-content">
        {/* <div className="appointment-list">
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <div key={ticket._id} style={{ justifyContent: 'space-between' }} className="ticket-item">
                <div style={{ marginLeft: '10px' }}>
                  <div>{ticket.member} : </div>
                  {ticket.docterId}
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
        </div> */}

        {/* <div className="sidebar"> */}
          {/* <button className='btn-common' onClick={handlerefresh} >Refresh</button> */}
          {/* <button className='btn-common' onClick={() => handleupdateupi(docId)}>Update Your Payment UPI</button> */}
          {/* <button className='btn-common' onClick={handleViewprofile} style={{ marginRight: '10px' }}>My Profile</button> */}
          <button className='btn-common' style={{ marginTop: '10px' }} onClick={handleLogout}>Logout</button>
        {/* </div> */}
      </div>
      {showPopupViewAppointment && <ViewAppointment onClose={handleCloseModalViewAppointment} ticket={selectedTicket} userId={userId} />}

      {showPopupResolveticket && <ResolveTicketPopup onClose={handleCloseModalResolveticket} ticketId={ticketId} userId={userId} dId={docId} />}
      {showPopupupi && <PaymentUPIpopup onClose={handleCloseModalUPI} dId={docId} />}
      {viewProfile && <DocView userId={id} onClose={handleCloseProfileView} />}
    </>
  );
}

export default Docdashboard;

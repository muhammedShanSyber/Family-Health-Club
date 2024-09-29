// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./signup.jsx";
import Doctor_portal from "./Doctor";
import Userdashboard from './Userdashboard';
import Admindashboard from './Admindashboard.jsx';
import Docdashboard from './Docdashboard.jsx';
import MarqueeDoctorList from './MarqueeDoctorList.jsx';
import Admin from './admin.jsx';
import Feed from './Feed.jsx';
// import './buttoncomm.css'
// import './admindashboard.css';
import Map from './map.jsx'
import RoomPage from './room/RoomPage.jsx';
import Logo from './assets/Icon.jpeg';
import './index.css'
// require('dotenv').config();
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.STRIPE_KEY);

function App() {
  return (
    <>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/doctor" element={<Doctor_portal />} />
            <Route path="/Userdashboard" element={<Userdashboard />} />
            <Route path="/Docdashboard" element={<Docdashboard />} />
            <Route path="/Admindashboard" element={<Admindashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path='/room/:roomId' element={<RoomPage />} />
            <Route path='/room/:roomId/back' element={<Doctor_portal />} />
          </Routes>

        </main>
      </div>
    </>
  );
}

function Home() {
  return (
    <>
      <header className="header">
        <span className="title">
          <img src={Logo} alt="Logo" className='w-12 h-12' />
          <b className='text-[55px]'> Family Health Hub</b>
        </span>
        <div className="header-buttons">
          <Link to="/doctor" className='p-1 font-bold text-white bg-transparent border rounded transition-all duration-300 ease-[cubic-bezier(0.23,_-0.37,_0.24,_0.94)]
 inline-block mr-[7px] hover:items-center hover:bg-[#11ff9e] hover:border-[#11ff9e] hover:transition-shadow hover:duration-300 hover:ease-in-out hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]

'>Doctors Portal</Link>
          <Link to="/login" className='p-1 font-bold text-white bg-transparent border rounded transition-all duration-300 ease-[cubic-bezier(0.23,_-0.37,_0.24,_0.94)]
 inline-block mr-[7px] hover:items-center hover:bg-[#11ff9e] hover:border-[#11ff9e] hover:transition-shadow hover:duration-300 hover:ease-in-out hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]

'>Login</Link>
          <Link to="/signup" className='p-1 font-bold text-white bg-transparent border rounded transition-all duration-300 ease-[cubic-bezier(0.23,_-0.37,_0.24,_0.94)]
 inline-block mr-[7px] hover:items-center hover:bg-[#11ff9e] hover:border-[#11ff9e] hover:transition-shadow hover:duration-300 hover:ease-in-out hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]

'>Sign Up</Link>
        </div>
      </header>
      <div >

        <b style={{ fontSize: "30px", marginLeft: "130px", marginBottom: '0' }}>Breaking News</b>
        <div className="trending-block">
          <Feed />
        </div>
        <b style={{ fontSize: "30px", marginLeft: "130px", marginBottom: '0' }}>Top Doctors</b>
        <div className="top-doc-block">
          <MarqueeDoctorList />
        </div>
      </div>
      <div>
        <Map />
      </div>

      <footer className="footer">
        <div className="social-media-links">
          <a className='ml-[620px]' href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <b style={{ marginLeft: "360px" }}>Contact no : YOUR CONTACT NUMBER</b>
        </div>
      </footer>
      <div className="LandingPage w-[1440px] h-[4727px] bg-[#676b74] flex-col justify-start items-start gap-px inline-flex">
  <div className="FisrtPage w-[1440px] h-[1020px] relative">
    <img className="PersonPracticingYogaMeditationOutdoorsNature1 w-[1440px] h-[1020px] left-0 top-0 absolute" src="https://via.placeholder.com/1440x1020" />
    <div className="Frame15 w-[637px] h-60 left-[78px] top-[247px] absolute flex-col justify-start items-start gap-[23px] inline-flex">
      <div className="MainHeading self-stretch text-white text-[40px] font-semibold font-['Inter'] tracking-wider">Empower Your Health Journey with Family Health Hub</div>
      <div className="Subheading self-stretch text-white/50 text-xl font-semibold font-['Inter'] tracking-wide">Connect, consult, and care for your family's health all in one place.</div>
      <div className="ServicesButtonHover w-[172px] h-[50px] px-9 py-[13px] bg-[#28301f] rounded-[10px] border-2 border-white justify-center items-center gap-2.5 inline-flex">
        <div className="Services text-white text-xl font-semibold font-['Inter'] tracking-widest">Services</div>
      </div>
    </div>
    <div className="Header w-[1440px] h-[90px] px-[43px] py-5 left-0 top-0 absolute border justify-start items-center gap-[94px] inline-flex">
      <div className="Brand h-[50.06px] relative">
        <div className="FhhLogo w-[102.70px] h-[50.06px] left-0 top-0 absolute">
          <div className="Rectangle2 w-[102.70px] h-[50.06px] left-0 top-0 absolute rounded-[9px] border-2 border-white" />
        </div>
        <div className="FamilyHealthHub w-[332px] h-11 left-[113.35px] top-[3px] absolute text-white text-4xl font-medium font-['Inter'] tracking-wide">Family Health Hub</div>
      </div>
      <div className="Menu w-[443px] h-[19px] relative">
        <div className="News w-[82px] h-[19px] left-[101px] top-0 absolute justify-center items-center inline-flex">
          <div className="News w-[82px] h-[19px] text-white text-base font-bold font-['Inter'] tracking-tight">SERVICES</div>
        </div>
        <div className="News w-14 h-[19px] left-0 top-0 absolute justify-center items-center inline-flex">
          <div className="News w-14 h-[19px] text-white text-base font-bold font-['Inter'] tracking-tight">NEWS</div>
        </div>
        <div className="Doctors w-[85px] h-[19px] left-[228px] top-0 absolute justify-center items-center inline-flex">
          <div className="Doctors w-[85px] h-[19px] text-white text-base font-bold font-['Inter'] tracking-tight">DOCTORS</div>
        </div>
        <div className="Contacts w-[85px] h-[19px] left-[358px] top-0 absolute justify-center items-center inline-flex">
          <div className="Contacts w-[85px] h-[19px] text-white text-base font-bold font-['Inter'] tracking-tight">CONTACT</div>
        </div>
      </div>
      <div className="Account h-[50px] relative">
        <div className="TransparentHoverEffect w-[172px] h-[50px] px-[34px] py-3.5 left-[96px] top-0 absolute rounded-[10px] border-2 border-white justify-center items-center gap-2.5 inline-flex">
          <div className="Register text-white text-xl font-semibold font-['Inter'] tracking-wide">REGISTER</div>
        </div>
        <div className="Login w-[68px] h-6 left-0 top-[13px] absolute text-white text-xl font-semibold font-['Inter'] tracking-wide">LOGIN</div>
      </div>
    </div>
  </div>
  <div className="ServicePage w-[1440px] h-[917px] relative">
    <div className="Group12 w-[404px] h-[292px] left-[75px] top-[129px] absolute">
      <div className="Rectangle12 w-[404px] h-[292px] left-0 top-0 absolute bg-[#2d3a29]/60 rounded-[15px] border-2 border-white backdrop-blur-[27px]" />
      <div className="SkipTheClinicVisitAndConsultWithTopDoctorsFromTheComfortOfYourHomeThroughSecureVideoCalls w-[368px] left-[14px] top-[94px] absolute text-white text-xl font-semibold font-['Inter'] tracking-widest">Skip the clinic visit and consult with top doctors from the comfort of your home through secure video calls.</div>
      <div className="LiveVideoConsultations w-[349px] left-[14px] top-[41px] absolute text-white text-2xl font-semibold font-['Inter'] tracking-widest">Live Video Consultations</div>
    </div>
    <div className="Group11 w-[758px] h-[185px] left-[607px] top-[129px] absolute">
      <div className="Frame11 w-[758px] h-[185px] left-0 top-0 absolute bg-[#2d3a29]/60 rounded-[15px] border-2 border-white backdrop-blur-[27px]" />
      <div className="EffortlessAppointmentBooking left-[159px] top-[33px] absolute text-white text-2xl font-semibold font-['Inter'] tracking-widest">Effortless Appointment Booking</div>
      <div className="SayGoodbyeToLongWaitsScheduleYourFamilySMedicalAppointmentsWithEaseAnytimeYouNeed w-[606px] left-[76px] top-[89px] absolute text-white text-xl font-semibold font-['Inter'] tracking-widest">Say goodbye to long waits! Schedule your family's medical appointments with ease, anytime you need.</div>
    </div>
    <div className="Frame13 w-[420px] h-[236px] px-[39px] pt-[49px] pb-[61px] left-[498px] top-[339px] absolute bg-[#2d3a29]/60 rounded-[15px] border-2 border-white flex-col justify-start items-center gap-3.5 inline-flex">
      <div className="SecureConfidential text-white text-2xl font-semibold font-['Inter'] tracking-widest">Secure & Confidential</div>
      <div className="YourPrivacyIsOurPriorityRestEasyKnowingThatYourHealthDataIsSafeguardedWithTopNotchSecurity w-[342px] text-white text-xl font-semibold font-['Inter'] tracking-widest">Your privacy is our priority. Rest easy knowing that your health data is safeguarded with top-notch security.</div>
    </div>
    <div className="Group9 w-[428px] h-[282px] left-[937px] top-[520px] absolute">
      <div className="Frame23 w-[428px] h-[282px] left-0 top-0 absolute justify-center items-center inline-flex">
        <div className="Rectangle15 w-[428px] h-[282px] bg-[#2d3a29]/60 rounded-[15px] border-2 border-white backdrop-blur-[27px]" />
      </div>
      <div className="PersonalizedHealthProfiles w-[391.09px] left-[19px] top-[41px] absolute text-white text-2xl font-semibold font-['Inter'] tracking-widest">Personalized Health Profiles</div>
      <div className="KeepYourFamilySHealthInCheckWithTailoredProfilesThatStoreAllTheEssentialMedicalInformation w-[373px] left-[28px] top-[113px] absolute text-white text-xl font-semibold font-['Inter'] tracking-widest">Keep your family's health in check with tailored profiles that store all the essential medical information.</div>
    </div>
    <div className="Frame8 w-[735px] h-[202px] px-[125px] py-[38px] left-[75px] top-[600px] absolute bg-[#2d3a29]/60 rounded-[15px] border-2 border-white backdrop-blur-[27px] flex-col justify-start items-center gap-6 inline-flex">
      <div className="StreamlinedPaymentProcess text-white text-2xl font-semibold font-['Inter'] tracking-widest">Streamlined Payment Process</div>
      <div className="EnjoyHassleFreeSecurePaymentsWithOurIntegratedSystemMakingHealthcareTransactionsSmootherThanEver w-[606px] text-white text-xl font-semibold font-['Inter'] tracking-widest">Enjoy hassle-free, secure payments with our integrated system, making healthcare transactions smoother than ever.</div>
    </div>
    <div className="Frame6 px-2.5 py-[12.30px] left-[68px] top-[46px] absolute justify-center items-center inline-flex">
      <div className="Services text-white text-[32px] font-semibold font-['Inter'] tracking-[3.20px]">Services</div>
    </div>
  </div>
  <div className="LatestNewsPage w-[1440px] h-[1025px] relative">
    <img className="SereneWomanWorkingRemotelyInNature1 w-[1440px] h-[1025px] left-0 top-0 absolute" src="https://via.placeholder.com/1440x1025" />
    <div className="Frame18 w-[420px] h-[333.64px] p-2.5 left-[68px] top-[478.25px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="FeedCard self-stretch h-[313.64px] px-[21px] py-[26px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-start gap-4 flex">
        <div className="NoFunctionalHospitalLeftInNorthernGaza w-[344px] h-[47px] text-center text-white text-xl font-bold font-['Inter'] tracking-widest">No functional hospital left in northern Gaza</div>
        <div className="NorthernGazaHasBeenLeftWithoutAFunctionalHospitalDueToALackOfFuelStaffAndSuppliesTheWorldHealthOrganizationWhoSaysAsIsraelHasTargetedMedicalFacilities w-[348px] h-[139px] text-white text-xl font-normal font-['Inter']">Northern Gaza has been left without a functional hospital due to a lack  of fuel, staff and supplies, the World Health Organization (WHO) says as  Israel has targeted medical facilities.</div>
      </div>
    </div>
    <div className="Frame17 w-[420px] h-[333.64px] p-2.5 left-[68px] top-[123.65px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="FeedCard1 self-stretch h-[313.64px] px-[21px] py-[26px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-start gap-4 flex">
        <div className="NoFunctionalHospitalLeftInNorthernGaza w-[344px] h-[47px] text-center text-white text-xl font-bold font-['Inter'] tracking-widest">No functional hospital left in northern Gaza</div>
        <div className="NorthernGazaHasBeenLeftWithoutAFunctionalHospitalDueToALackOfFuelStaffAndSuppliesTheWorldHealthOrganizationWhoSaysAsIsraelHasTargetedMedicalFacilities w-[348px] h-[139px] text-white text-xl font-normal font-['Inter']">Northern Gaza has been left without a functional hospital due to a lack  of fuel, staff and supplies, the World Health Organization (WHO) says as  Israel has targeted medical facilities.</div>
      </div>
    </div>
    <div className="Frame16 w-[420px] h-[333.64px] p-2.5 left-[510px] top-[123.65px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="FeedCard self-stretch h-[313.64px] p-[26px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-start gap-4 flex">
        <div className="NoFunctionalHospitalLeftInNorthernGaza w-[344px] h-[47px] text-center text-white text-xl font-bold font-['Inter'] tracking-widest">No functional hospital left in northern Gaza</div>
        <div className="NorthernGazaHasBeenLeftWithoutAFunctionalHospitalDueToALackOfFuelStaffAndSuppliesTheWorldHealthOrganizationWhoSaysAsIsraelHasTargetedMedicalFacilities w-[348px] h-[139px] text-white text-xl font-normal font-['Inter']">Northern Gaza has been left without a functional hospital due to a lack  of fuel, staff and supplies, the World Health Organization (WHO) says as  Israel has targeted medical facilities.</div>
      </div>
    </div>
    <div className="Frame19 w-[420px] h-[333.64px] p-2.5 left-[510px] top-[478.25px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="FeedCard self-stretch h-[313.64px] p-[26px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-start gap-4 flex">
        <div className="NoFunctionalHospitalLeftInNorthernGaza w-[344px] h-[47px] text-center text-white text-xl font-bold font-['Inter'] tracking-widest">No functional hospital left in northern Gaza</div>
        <div className="NorthernGazaHasBeenLeftWithoutAFunctionalHospitalDueToALackOfFuelStaffAndSuppliesTheWorldHealthOrganizationWhoSaysAsIsraelHasTargetedMedicalFacilities w-[348px] h-[139px] text-white text-xl font-normal font-['Inter']">Northern Gaza has been left without a functional hospital due to a lack  of fuel, staff and supplies, the World Health Organization (WHO) says as  Israel has targeted medical facilities.</div>
      </div>
    </div>
    <div className="Frame21 w-[420px] h-[331px] p-2.5 left-[952px] top-[123.65px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="FeedCard self-stretch h-[311px] px-[26px] py-6 bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-start gap-[29px] flex">
        <div className="NoFunctionalHospitalLeftInNorthernGaza self-stretch h-[47px] text-center text-white text-xl font-bold font-['Inter'] tracking-widest">No functional hospital left in northern Gaza</div>
        <div className="NorthernGazaHasBeenLeftWithoutAFunctionalHospitalDueToALackOfFuelStaffAndSuppliesTheWorldHealthOrganizationWhoSaysAsIsraelHasTargetedMedicalFacilities self-stretch h-[139px] text-white text-xl font-normal font-['Inter']">Northern Gaza has been left without a functional hospital due to a lack  of fuel, staff and supplies, the World Health Organization (WHO) says as  Israel has targeted medical facilities.</div>
        <div className="Wed29724 w-[106px] text-white text-base font-normal font-['Inter']">Wed 29/7/24</div>
      </div>
    </div>
    <div className="Frame20 w-[420px] h-[333.64px] p-2.5 left-[952px] top-[478.25px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="FeedCard self-stretch h-[313.64px] p-[26px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-start gap-4 flex">
        <div className="NoFunctionalHospitalLeftInNorthernGaza w-[344px] h-[47px] text-center text-white text-xl font-bold font-['Inter'] tracking-widest">No functional hospital left in northern Gaza</div>
        <div className="NorthernGazaHasBeenLeftWithoutAFunctionalHospitalDueToALackOfFuelStaffAndSuppliesTheWorldHealthOrganizationWhoSaysAsIsraelHasTargetedMedicalFacilities w-[348px] h-[139px] text-white text-xl font-normal font-['Inter']">Northern Gaza has been left without a functional hospital due to a lack  of fuel, staff and supplies, the World Health Organization (WHO) says as  Israel has targeted medical facilities.</div>
      </div>
    </div>
    <div className="Frame5 h-[63.59px] p-2.5 left-[68px] top-[53.89px] absolute justify-center items-center gap-2.5 inline-flex">
      <div className="LatestNews text-white text-[32px] font-semibold font-['Inter'] tracking-[3.20px]">Latest News</div>
    </div>
    <div className="MoreButtonHover w-[172px] h-[54px] px-[46px] py-[13px] left-[1190px] top-[876px] absolute rounded-[10px] border-2 border-white justify-center items-center gap-2.5 inline-flex">
      <div className="More text-white text-xl font-semibold font-['Inter'] tracking-widest">More...</div>
    </div>
  </div>
  <div className="DoctorPage w-[1633px] h-[634px] relative">
    <img className="CosmeticItemWithMarijuanaLeaves1 w-[1440px] h-[634px] left-[94px] top-0 absolute" src="https://via.placeholder.com/1440x634" />
    <div className="OutDoctorsHeading h-[73.92px] p-2.5 left-[162px] top-[60.14px] absolute justify-center items-center gap-2.5 inline-flex">
      <div className="OurDoctors text-white text-[32px] font-semibold font-['Inter'] tracking-[3.20px]">Our Doctors</div>
    </div>
    <div className="VuesaxLinearArrowLeft w-[50px] h-[50px] left-[105px] top-[270px] absolute justify-center items-center inline-flex">
      <div className="ArrowLeft w-[50px] h-[50px] relative">
      </div>
    </div>
    <div className="VuesaxLinearArrowRight w-[50px] h-[50px] left-[1473px] top-[270px] absolute justify-center items-center inline-flex">
      <div className="ArrowRight w-[50px] h-[50px] relative">
      </div>
    </div>
    <div className="Component1Frame23 w-[1633px] h-[445px] pb-[0.20px] left-0 top-[134px] absolute justify-end items-center inline-flex">
      <div className="Frame22 w-[3878.71px] h-[444.80px] justify-start items-start gap-9 inline-flex">
        <div className="DocProfile w-[290.23px] h-[444.80px] px-[55px] pt-[60px] pb-7 bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-center gap-[34px] inline-flex">
          <img className="AvatarImage120 w-[120px] h-[120px] relative rounded-[60px]" src="https://via.placeholder.com/120x120" />
          <div className="MartinMango self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Martin Mango</div>
          <div className="DoctorRole self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Doctor Role</div>
          <div className="ViewProfileHover w-[180.42px] h-[50px] relative">
            <div className="Rectangle2 w-[180.42px] h-[50px] left-0 top-0 absolute rounded-[10px] border-2 border-white" />
            <div className="ViewProfile w-[145.81px] h-6 left-[19.63px] top-[13px] absolute text-white text-xl font-semibold font-['Inter'] tracking-widest">View Profile</div>
          </div>
        </div>
        <div className="DocProfile w-[290.23px] h-[444.80px] px-[55px] pt-[60px] pb-7 bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-center gap-[34px] inline-flex">
          <img className="AvatarImage120 w-[120px] h-[120px] relative rounded-[60px]" src="https://via.placeholder.com/120x120" />
          <div className="KadinSiphron self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Kadin Siphron</div>
          <div className="DoctorRole self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Doctor Role</div>
          <div className="ViewProfileHover w-[180.42px] h-[50px] relative">
            <div className="Rectangle2 w-[180.42px] h-[50px] left-0 top-0 absolute rounded-[10px] border-2 border-white" />
            <div className="ViewProfile w-[145.81px] h-6 left-[19.63px] top-[13px] absolute text-white text-xl font-semibold font-['Inter'] tracking-widest">View Profile</div>
          </div>
        </div>
        <div className="DocProfile w-[290.23px] h-[444.80px] px-[55px] pt-[60px] pb-[84px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-center gap-[34px] inline-flex">
          <img className="AvatarImage120 w-[120px] h-[120px] relative rounded-[60px]" src="https://via.placeholder.com/120x120" />
          <div className="CoreyFranci self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Corey Franci</div>
          <div className="DoctorRole self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Doctor Role</div>
          <div className="ViewProfileHover w-[180.42px] h-[50px] relative">
            <div className="Rectangle2 w-[180.42px] h-[50px] left-0 top-0 absolute rounded-[10px] border-2 border-white" />
            <div className="ViewProfile w-[145.81px] h-6 left-[19.63px] top-[13px] absolute text-white text-xl font-semibold font-['Inter'] tracking-widest">View Profile</div>
          </div>
        </div>
        <div className="DocProfile w-[290.23px] h-[444.80px] px-[55px] pt-[60px] pb-[82px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-center gap-[34px] inline-flex">
          <img className="AvatarImage120 w-[120px] h-[120px] relative rounded-[60px]" src="https://via.placeholder.com/120x120" />
          <div className="WilsonVaccaro self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Wilson Vaccaro</div>
          <div className="DoctorRole self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Doctor Role</div>
          <div className="ViewProfileHover w-[180.42px] h-[50px] relative">
            <div className="Rectangle2 w-[180.42px] h-[50px] left-0 top-0 absolute rounded-[10px] border-2 border-white" />
            <div className="ViewProfile w-[145.81px] h-6 left-[19.63px] top-[13px] absolute text-white text-xl font-semibold font-['Inter'] tracking-widest">View Profile</div>
          </div>
        </div>
        <div className="DocProfile w-[290.23px] h-[444.80px] px-[55px] pt-[60px] pb-[82px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-center gap-[34px] inline-flex">
          <img className="AvatarImage120 w-[120px] h-[120px] relative rounded-[60px]" src="https://via.placeholder.com/120x120" />
          <div className="WilsonVaccaro self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Wilson Vaccaro</div>
          <div className="DoctorRole self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Doctor Role</div>
          <div className="ViewProfileHover w-[180.42px] h-[50px] relative">
            <div className="Rectangle2 w-[180.42px] h-[50px] left-0 top-0 absolute rounded-[10px] border-2 border-white" />
            <div className="ViewProfile w-[145.81px] h-6 left-[19.63px] top-[13px] absolute text-white text-xl font-semibold font-['Inter'] tracking-widest">View Profile</div>
          </div>
        </div>
        <div className="DocProfile h-[444.80px] px-[55px] pt-[60px] pb-[82px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-center gap-[34px] inline-flex">
          <img className="AvatarImage120 w-[120px] h-[120px] relative rounded-[60px]" src="https://via.placeholder.com/120x120" />
          <div className="WilsonVaccaro self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Wilson Vaccaro</div>
          <div className="DoctorRole self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Doctor Role</div>
          <div className="ViewProfileHover w-[180.42px] h-[50px] relative">
            <div className="Rectangle2 w-[180.42px] h-[50px] left-0 top-0 absolute rounded-[10px] border-2 border-white" />
            <div className="ViewProfile w-[145.81px] h-6 left-[19.63px] top-[13px] absolute text-white text-xl font-semibold font-['Inter'] tracking-widest">View Profile</div>
          </div>
        </div>
        <div className="DocProfile w-[290.23px] h-[444.80px] px-[55px] pt-[60px] pb-7 bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-center gap-[34px] inline-flex">
          <img className="AvatarImage120 w-[120px] h-[120px] relative rounded-[60px]" src="https://via.placeholder.com/120x120" />
          <div className="MartinMango self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Martin Mango</div>
          <div className="DoctorRole self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Doctor Role</div>
          <div className="ViewProfileHover w-[180.42px] h-[50px] relative">
            <div className="Rectangle2 w-[180.42px] h-[50px] left-0 top-0 absolute rounded-[10px] border-2 border-white" />
            <div className="ViewProfile w-[145.81px] h-6 left-[19.63px] top-[13px] absolute text-white text-xl font-semibold font-['Inter'] tracking-widest">View Profile</div>
          </div>
        </div>
        <div className="DocProfile w-[290.23px] h-[444.80px] px-[55px] pt-[60px] pb-7 bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-center gap-[34px] inline-flex">
          <img className="AvatarImage120 w-[120px] h-[120px] relative rounded-[60px]" src="https://via.placeholder.com/120x120" />
          <div className="KadinSiphron self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Kadin Siphron</div>
          <div className="DoctorRole self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Doctor Role</div>
          <div className="ViewProfileHover w-[180.42px] h-[50px] relative">
            <div className="Rectangle2 w-[180.42px] h-[50px] left-0 top-0 absolute rounded-[10px] border-2 border-white" />
            <div className="ViewProfile w-[145.81px] h-6 left-[19.63px] top-[13px] absolute text-white text-xl font-semibold font-['Inter'] tracking-widest">View Profile</div>
          </div>
        </div>
        <div className="DocProfile w-[290.23px] h-[444.80px] px-[55px] pt-[60px] pb-[84px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-center gap-[34px] inline-flex">
          <img className="AvatarImage120 w-[120px] h-[120px] relative rounded-[60px]" src="https://via.placeholder.com/120x120" />
          <div className="CoreyFranci self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Corey Franci</div>
          <div className="DoctorRole self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Doctor Role</div>
          <div className="ViewProfileHover w-[180.42px] h-[50px] relative">
            <div className="Rectangle2 w-[180.42px] h-[50px] left-0 top-0 absolute rounded-[10px] border-2 border-white" />
            <div className="ViewProfile w-[145.81px] h-6 left-[19.63px] top-[13px] absolute text-white text-xl font-semibold font-['Inter'] tracking-widest">View Profile</div>
          </div>
        </div>
        <div className="DocProfile w-[290.23px] h-[444.80px] px-[55px] pt-[60px] pb-[82px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-center gap-[34px] inline-flex">
          <img className="AvatarImage120 w-[120px] h-[120px] relative rounded-[60px]" src="https://via.placeholder.com/120x120" />
          <div className="WilsonVaccaro self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Wilson Vaccaro</div>
          <div className="DoctorRole self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Doctor Role</div>
          <div className="ViewProfileHover w-[180.42px] h-[50px] relative">
            <div className="Rectangle2 w-[180.42px] h-[50px] left-0 top-0 absolute rounded-[10px] border-2 border-white" />
            <div className="ViewProfile w-[145.81px] h-6 left-[19.63px] top-[13px] absolute text-white text-xl font-semibold font-['Inter'] tracking-widest">View Profile</div>
          </div>
        </div>
        <div className="DocProfile w-[290.23px] h-[444.80px] px-[55px] pt-[60px] pb-[82px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-center gap-[34px] inline-flex">
          <img className="AvatarImage120 w-[120px] h-[120px] relative rounded-[60px]" src="https://via.placeholder.com/120x120" />
          <div className="WilsonVaccaro self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Wilson Vaccaro</div>
          <div className="DoctorRole self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Doctor Role</div>
          <div className="ViewProfileHover w-[180.42px] h-[50px] relative">
            <div className="Rectangle2 w-[180.42px] h-[50px] left-0 top-0 absolute rounded-[10px] border-2 border-white" />
            <div className="ViewProfile w-[145.81px] h-6 left-[19.63px] top-[13px] absolute text-white text-xl font-semibold font-['Inter'] tracking-widest">View Profile</div>
          </div>
        </div>
        <div className="DocProfile w-[290.23px] h-[444.80px] px-[55px] pt-[60px] pb-[82px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-center gap-[34px] inline-flex">
          <img className="AvatarImage120 w-[120px] h-[120px] relative rounded-[60px]" src="https://via.placeholder.com/120x120" />
          <div className="WilsonVaccaro self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Wilson Vaccaro</div>
          <div className="DoctorRole self-stretch text-center text-white text-xl font-bold font-['Inter'] tracking-widest">Doctor Role</div>
          <div className="ViewProfileHover w-[180.42px] h-[50px] relative">
            <div className="Rectangle2 w-[180.42px] h-[50px] left-0 top-0 absolute rounded-[10px] border-2 border-white" />
            <div className="ViewProfile w-[145.81px] h-6 left-[19.63px] top-[13px] absolute text-white text-xl font-semibold font-['Inter'] tracking-widest">View Profile</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="MapPage w-[1440px] h-[1024px] relative">
    <img className="SustainableTravelConcept1 w-[1440px] h-[1024px] left-0 top-0 absolute" src="https://via.placeholder.com/1440x1024" />
    <div className="Frame6 w-[237px] h-[58.47px] p-2.5 left-[1132px] top-[79.46px] absolute justify-center items-center gap-2.5 inline-flex">
      <div className="PleaseTurnOnTheLocation text-white/70 text-base font-bold font-['Inter'] tracking-tight">Please turn on the location</div>
    </div>
    <div className="NearByHospitalsHeading w-[341px] h-[88.46px] p-2.5 left-[68px] top-[43.48px] absolute justify-center items-center gap-2.5 inline-flex">
      <div className="NearByHospitals text-white text-[32px] font-semibold font-['Inter'] tracking-[3.20px]">Near by hospitals</div>
    </div>
    <img className="HospitalsInSouthAfrica1 w-[1284px] h-[818.60px] left-[78px] top-[137.93px] absolute rounded-[10px]" src="https://via.placeholder.com/1284x819" />
  </div>
  <div className="Footer w-[1440px] h-[107.20px] relative">
    <div className="GithubLink w-[1440px] h-[107.20px] left-0 top-0 absolute bg-[#28301f]" />
    <div className="DesignerLink h-[39.21px] p-2.5 left-[1157px] top-[62.81px] absolute justify-center items-center gap-2.5 inline-flex">
      <div className="DesignedByMohammedShan w-[245px] h-[19.21px] justify-center items-center flex">
        <div className="DesignedByMohammedShan w-[245px] h-[19.21px] text-white/70 text-base font-bold font-['Inter'] tracking-tight">Designed by Mohammed Shan</div>
      </div>
    </div>
    <div className="SocialMediaLink w-[118px] h-[62.70px] left-[661px] top-[10.11px] absolute">
      <div className="VuesaxLinearInstagram w-6 h-[24.27px] left-0 top-[38.43px] absolute flex-col justify-center items-center inline-flex">
        <div className="Instagram w-6 h-[24.27px] relative">
        </div>
      </div>
      <div className="VuesaxLinearFacebook w-6 h-[24.27px] left-[47px] top-[38.43px] absolute flex-col justify-center items-center inline-flex">
        <div className="Facebook w-6 h-[24.27px] relative">
        </div>
      </div>
      <div className="VuesaxLinearSms w-6 h-[24.27px] left-[94px] top-[38.43px] absolute flex-col justify-center items-center inline-flex">
        <div className="Sms w-6 h-[24.27px] relative">
        </div>
      </div>
      <div className="ContactUs w-[98px] h-[19.21px] left-[12px] top-0 absolute text-white text-base font-bold font-['Inter'] tracking-tight">Contact us :</div>
    </div>
    <div className="NewsLetterBar w-[375px] h-[75px] left-[36px] top-[17px] absolute">
      <div className="Rectangle25 w-[369px] h-[43.10px] left-0 top-[25px] absolute bg-white rounded-[14px]" />
      <div className="EmailAddress w-[145px] h-[22.49px] left-[18px] top-[35.31px] absolute opacity-50 text-black text-xl font-bold font-['Inter'] tracking-tight">Email Address</div>
      <div className="Frame24 w-[60px] h-[57px] pl-3 pr-2 pt-[9px] pb-2 left-[315px] top-[18px] absolute justify-end items-center inline-flex">
        <div className="SendButton w-10 h-10 relative">
          <div className="Rectangle26 w-10 h-10 left-0 top-0 absolute bg-[#26271b] rounded-[14px]" />
          <div className="VuesaxBoldSend w-6 h-[25.61px] left-[8px] top-[6.47px] absolute flex-col justify-center items-center inline-flex">
            <div className="Send w-6 h-[25.61px] relative">
            </div>
          </div>
        </div>
      </div>
      <div className="SubscribeToWeeklyNewsletter w-[323px] h-[22.49px] left-0 top-0 absolute text-white text-xl font-bold font-['Inter'] tracking-tight">Subscribe to weekly Newsletter</div>
    </div>
  </div>
</div>
    </>

  );
}

export default App;

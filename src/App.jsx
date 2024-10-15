import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./signup.jsx";
import Doctor_portal from "./Doctor";
import Userdashboard from './Userdashboard';
import Admindashboard from './Admindashboard.jsx';
import Docdashboard from './Docdashboard.jsx';
// import MarqueeDoctorList from './MarqueeDoctorList.jsx';
import MarqueeDoctorList from "./components/MarqueeDoctorList.jsx";
import Admin from './admin.jsx';
// import Feed from './Feed.jsx';
// import './buttoncomm.css'
// import './admindashboard.css';
import Map from './map.jsx'
import RoomPage from './room/RoomPage.jsx';
// import Logo from './assets/Icon.jpeg';
import Services from "./components/Services.jsx";
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
  const navigate = useNavigate();
  const signUp = () => {
    navigate('/signup')
  }
  const userLogin = () => {
    navigate('/login')
  }
  const docLogin = () => {
    navigate('/doctor')
  }
  return (
    <>
      {/* <header className="header"> */}
        {/* <span className="title"> */}
        {/* <img src={Logo} alt="Logo" className='w-12 h-12' /> */}
        {/* <b className='text-[55px]'> Family Health Hub</b> */}
        {/* </span> */}
        {/* <div className="header-buttons"> */}
          {/* <Link to="/doctor" className='p-1 font-bold text-white bg-transparent border rounded transition-all duration-300 ease-[cubic-bezier(0.23,_-0.37,_0.24,_0.94)]
 inline-block mr-[7px] hover:items-center hover:bg-[#11ff9e] hover:border-[#11ff9e] hover:transition-shadow hover:duration-300 hover:ease-in-out hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]

'>Doctors Portal</Link> */}
          {/* <Link to="/login" className='p-1 font-bold text-white bg-transparent border rounded transition-all duration-300 ease-[cubic-bezier(0.23,_-0.37,_0.24,_0.94)]
 inline-block mr-[7px] hover:items-center hover:bg-[#11ff9e] hover:border-[#11ff9e] hover:transition-shadow hover:duration-300 hover:ease-in-out hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]

'>Login</Link>
          <Link to="/signup" className='p-1 font-bold text-white bg-transparent border rounded transition-all duration-300 ease-[cubic-bezier(0.23,_-0.37,_0.24,_0.94)]
 inline-block mr-[7px] hover:items-center hover:bg-[#11ff9e] hover:border-[#11ff9e] hover:transition-shadow hover:duration-300 hover:ease-in-out hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]

'>Sign Up</Link> */}
        {/* </div> */}
      {/* </header> */}
      {/* <div > */}

        {/* <b style={{ fontSize: "30px", marginLeft: "130px", marginBottom: '0' }}>Breaking News</b> */}
        {/* <div className="trending-block"> */}
          {/* <Feed /> */}
        {/* </div> */}
        {/* <b style={{ fontSize: "30px", marginLeft: "130px", marginBottom: '0' }}>Top Doctors</b> */}
        {/* <div className="top-doc-block"> */}
          {/* <MarqueeDoctorList /> */}
        {/* </div> */}
      {/* </div> */}
      {/* <div> */}
        {/* <Map /> */}
      {/* </div> */}

      <div className=" w-full h-[4727px] bg-[#676b74] flex-col justify-start items-start gap-px inline-flex">
        <div className=" w-full h-[1020px] relative">
          {/* <img className="PersonPracticingYogaMeditationOutdoorsNature1 w-[1440px] h-[1020px] left-0 top-0 absolute" src="https://via.placeholder.com/1440x1020" /> */}
          <div className=" w-full h-[90px] px-[43px] py-0 left-0 top-0 absolute border justify-around items-center gap-[94px] inline-flex">
            <div className=" h-[50.06px] relative">
              {/* <div className="FhhLogo w-[102.70px] h-[50.06px] left-0 top-0 absolute">
                <div className="Rectangle2 w-[102.70px] h-[50.06px] left-0 top-0 absolute rounded-[9px] border-2 border-white" />
              </div> */}
              <div className=" w-[332px] h-11 left-[113.35px] top-[3px] absolute text-white text-4xl font-medium   tracking-wide">Family Health Hub</div>
            </div>
            <div className=" w-fit h-[19px] relative">
              <a href="#" className=' text-white text-base font-bold'>Services</a>
              <a href="#" className='ml-10 text-white text-base font-bold'>News</a>
              <a href="#" className='ml-10 text-white text-base font-bold'>Doctors</a>
              <a href="#" className='ml-10 text-white text-base font-bold'>Contact</a>
              <a href="#" onClick={docLogin} className='ml-10 text-white text-base font-bold'>Doctor Portal</a>

            </div>
            <div className="  h-[50px] relative">
              <button onClick={userLogin} className="Login w-[68px] h-6 left-0 top-[13px]  text-white text-xl font-semibold   tracking-wide">Login</button>
              <button onClick={signUp} className="   tracking-wide text-white text-xl font-semibold  h-[50px] px-[34px] py-3.5  rounded-[10px] border-2 border-white justify-center items-center gap-2.5 inline-flex">REGISTER</button>
            </div>
          </div>
          <div className=" w-[637px] h-60 left-[78px] top-[247px] absolute flex-col justify-start items-start gap-[23px] inline-flex">
            <div className="MainHeading self-stretch text-white text-[40px] font-semibold   tracking-wider">Empower Your Health Journey with Family Health Hub</div>
            <div className="Subheading self-stretch text-white/50 text-xl font-semibold   tracking-wide">Connect, consult, and care for your family's health all in one place.</div>
            <button className="text-white text-xl font-semibold   tracking-widest w-[172px] h-[50px] px-9 py-[13px] bg-[#28301f] rounded-[10px] border-2 border-white justify-center items-center gap-2.5 inline-flex">Services</button>
          </div>


        </div>
        <div className=" w-[1440px] h-[917px] relative">

          <span className="absolute px-2.5 py-[12.30px]  tracking-[3.20px] left-[68px] top-[46px] text-white text-[32px] font-semibold ">Services</span>
          <div className=" w-[404px] h-[292px] left-[75px] top-[129px] absolute  bg-[#2d3a29]/60 rounded-[15px] border-2 border-white backdrop-blur-[27px]">
            <Services heading="Live Video Consultations" subheading="Skip the clinic visit and consult with top doctors from the comfort of your home through secure video calls." />
          </div>

          <div className=" w-[758px] h-[185px] left-[607px] top-[129px] absolute bg-[#2d3a29]/60 rounded-[15px] border-2 border-white backdrop-blur-[27px]">
            <Services heading="Effortless Appointment Booking" subheading="Say goodbye to long waits! Schedule your family's medical appointments with ease, anytime you need." />
          </div>

          <div className=" w-[420px] h-[236px] px-[39px] pt-[49px] pb-[61px] left-[498px] top-[339px] absolute bg-[#2d3a29]/60 rounded-[15px] border-2 border-white flex-col justify-start items-center gap-3.5 inline-flex">
            <Services heading="Secure & Confidential" subheading="Your privacy is our priority. Rest easy knowing that your health data is safeguarded with top-notch security." />

          </div>

          <div className=" w-[428px] h-[282px] left-[937px] top-[520px] absolute  bg-[#2d3a29]/60 rounded-[15px] border-2 border-white backdrop-blur-[27px] justify-center items-center tracking-widest">
            <Services heading="Personalized Health Profiles" subheading="Keep your family's health in check with tailored profiles that store all the essential medical information." />

          </div>

          <div className=" w-[735px] h-[202px] px-[125px] py-[38px] left-[75px] top-[600px] absolute bg-[#2d3a29]/60 rounded-[15px] border-2 border-white backdrop-blur-[27px] flex-col justify-start items-center gap-6 inline-flex">
            <Services heading="Streamlined Payment Process" subheading="Enjoy hassle-free, secure payments with our integrated system, making healthcare transactions smoother than ever." />

          </div>


        </div>
        <div className=" w-full h-[1025px] relative">
          {/* <img className=" w-[1440px] h-[1025px] left-0 top-0 absolute" src="https://via.placeholder.com/1440x1025" /> */}

          <span className=" text-white text-[32px] font-semibold   tracking-[3.20px] h-[63.59px] p-2.5 left-[68px] top-[53.89px] absolute justify-center items-center gap-2.5 inline-flex">Latest News</span>

          <div className=" w-[420px] h-[333.64px] p-2.5 left-[68px] top-[478.25px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
            <div className=" self-stretch h-[313.64px] px-[21px] py-[26px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-start gap-4 flex">
              <div className=" w-[344px] h-[47px] text-center text-white text-xl font-bold   tracking-widest"> functional hospital left in northern Gaza</div>
              <div className=" w-[348px] h-[139px] text-white text-xl font-normal  ">Northern Gaza has been left without a functional hospital due to a lack  of fuel, staff and supplies, the World Health Organization (WHO) says as  Israel has targeted medical facilities.</div>
            </div>
          </div>
          <div className=" w-[420px] h-[333.64px] p-2.5 left-[68px] top-[123.65px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
            <div className=" self-stretch h-[313.64px] px-[21px] py-[26px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-start gap-4 flex">
              <div className=" w-[344px] h-[47px] text-center text-white text-xl font-bold   tracking-widest">No functional hospital left in northern Gaza</div>
              <div className=" w-[348px] h-[139px] text-white text-xl font-normal  ">Northern Gaza has been left without a functional hospital due to a lack  of fuel, staff and supplies, the World Health Organization (WHO) says as  Israel has targeted medical facilities.</div>
            </div>
          </div>
          <div className=" w-[420px] h-[333.64px] p-2.5 left-[510px] top-[123.65px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
            <div className=" self-stretch h-[313.64px] p-[26px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-start gap-4 flex">
              <div className=" w-[344px] h-[47px] text-center text-white text-xl font-bold   tracking-widest">No functional hospital left in northern Gaza</div>
              <div className=" w-[348px] h-[139px] text-white text-xl font-normal  ">Northern Gaza has been left without a functional hospital due to a lack  of fuel, staff and supplies, the World Health Organization (WHO) says as  Israel has targeted medical facilities.</div>
            </div>
          </div>
          <div className=" w-[420px] h-[333.64px] p-2.5 left-[510px] top-[478.25px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
            <div className=" self-stretch h-[313.64px] p-[26px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-start gap-4 flex">
              <div className=" w-[344px] h-[47px] text-center text-white text-xl font-bold   tracking-widest">No functional hospital left in northern Gaza</div>
              <div className=" w-[348px] h-[139px] text-white text-xl font-normal  ">Northern Gaza has been left without a functional hospital due to a lack  of fuel, staff and supplies, the World Health Organization (WHO) says as  Israel has targeted medical facilities.</div>
            </div>
          </div>
          <div className=" w-[420px] h-[331px] p-2.5 left-[952px] top-[123.65px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
            <div className=" self-stretch h-[311px] px-[26px] py-6 bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-start gap-[29px] flex">
              <div className=" self-stretch h-[47px] text-center text-white text-xl font-bold   tracking-widest">No functional hospital left in northern Gaza</div>
              <div className=" self-stretch h-[139px] text-white text-xl font-normal  ">Northern Gaza has been left without a functional hospital due to a lack  of fuel, staff and supplies, the World Health Organization (WHO) says as  Israel has targeted medical facilities.</div>
              <div className=" w-[106px] text-white text-base font-normal  ">Wed 29/7/24</div>
            </div>
          </div>
          <div className=" w-[420px] h-[333.64px] p-2.5 left-[952px] top-[478.25px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
            <div className=" self-stretch h-[313.64px] p-[26px] bg-[#28301f]/60 rounded-[10px] border-2 border-white backdrop-blur-md flex-col justify-start items-start gap-4 flex">
              <div className=" w-[344px] h-[47px] text-center text-white text-xl font-bold   tracking-widest">No functional hospital left in northern Gaza</div>
              <div className=" w-[348px] h-[139px] text-white text-xl font-normal  ">Northern Gaza has been left without a functional hospital due to a lack  of fuel, staff and supplies, the World Health Organization (WHO) says as  Israel has targeted medical facilities.</div>
            </div>
          </div>


          <button className="w-[172px] h-[54px] px-[46px] py-[13px] left-[1590px] top-[876px] absolute rounded-[10px] border-2 border-white justify-center items-center gap-2.5 inline-flex text-white text-xl font-semibold   tracking-widest">More...</button>
        </div>
        <div className=" w-[1633px] h-[634px] relative">
          {/* <img className="CosmeticItemWithMarijuanaLeaves1 w-[1440px] h-[634px] left-[94px] top-0 absolute" src="https://via.placeholder.com/1440x634" /> */}
          <div className=" h-[73.92px] p-2.5  justify-center items-center gap-2.5 inline-flex">
            <div className=" "></div>
            <span className="text-white text-[32px] font-semibold left-[70px] top-[60.14px] absolute tracking-[3.20px]">Our Doctors</span>
          </div>
          <div className=" w-[50px] h-[50px] left-[105px] top-[270px] absolute justify-center items-center inline-flex">
            <div className=" w-[50px] h-[50px] relative">
            </div>
          </div>
          <div className=" w-[50px] h-[50px] left-[1473px] top-[270px] absolute justify-center items-center inline-flex">
            <div className=" w-[50px] h-[50px] relative">
            </div>
          </div>
          <div className=" w-full h-[445px] pb-[0.20px] left-0 top-[134px] absolute justify-end items-center inline-flex">
            <marquee>
              <div className=" w-full h-[444.80px] justify-start items-start gap-9 inline-flex">
                <MarqueeDoctorList docName="Martin Mango" docRole="Doctor Role" />
                <MarqueeDoctorList docName="Martin Mango" docRole="Doctor Role" />
                <MarqueeDoctorList docName="Martin Mango" docRole="Doctor Role" />
              </div>

            </marquee>
          </div>
        </div>
        <div className=" w-full h-[1024px] relative">

          {/* <img className="SustainableTravelConcept1 w-[1440px] h-[1024px] left-0 top-0 absolute" src="https://via.placeholder.com/1440x1024" /> */}

          <span className=" text-white text-[32px] font-semibold  p-2.5 left-[68px] top-[43.48px] absolute tracking-[3.20px]">Near by hospitals</span>
          <span className=" text-white/70 text-base font-bold p-2.5 left-[1132px] top-[79.46px] absolute tracking-tight">Please turn on the location</span>
          <Map />
          {/* <img className=" w-[1284px] h-[818.60px] left-[78px] top-[137.93px] absolute rounded-[10px]" src="https://via.placeholder.com/1284x819" /> */}
        </div>
        {/* <div className="Footer w-full h-[107.20px] relative"> */}
        <div className=" w-full h-[107.20px] left-0 top-0 relative bg-[#28301f]" >
          <span className="left-[1657px] top-[62.81px] absolute text-white/70 text-base font-bold   tracking-tight">Designed by Mohammed Shan</span>

          <div className=" w-[118px] h-[62.70px] left-[661px] top-[10.11px] absolute">
            <div className=" w-6 h-[24.27px] left-0 top-[38.43px] absolute flex-col justify-center items-center inline-flex">
              <div className=" w-6 h-[24.27px] relative">
              </div>
            </div>
            <div className=" w-6 h-[24.27px] left-[47px] top-[38.43px] absolute flex-col justify-center items-center inline-flex">
              <div className=" w-6 h-[24.27px] relative">
              </div>
            </div>
            <div className=" w-6 h-[24.27px] left-[94px] top-[38.43px] absolute flex-col justify-center items-center inline-flex">
              <div className=" w-6 h-[24.27px] relative">
              </div>
            </div>

            <span className="text-white text-base font-bold   tracking-tight">Contact us :</span>


          </div>
          <div className=" w-[375px] h-[75px] left-[36px] top-[17px] absolute text-black text-xl font-bold  ">
            <input placeholder='Email Address' className="w-[369px] h-[43.10px] left-0 top-[25px] absolute bg-white rounded-[14px]" type="email" name="" id="" />
            <button className="w-10 h-10  left-[326px] top-[27px] absolute bg-[#26271b] rounded-[14px] justify-center items-center">S</button>
            <span className="absolute text-white text-xl font-bold   tracking-tight">Subscribe to weekly Newsletter</span>
          </div>

        </div>
        {/* </div> */}
      </div>
    </>

  );
}

export default App;

import React, { useState } from 'react';
import './AddDoctorModal.css';
import './buttoncomm.css'
require('dotenv').config();

function AddDoctorModal({ onSave, onCancel }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [hospital, setHospital] = useState('');
    const [paymentupi, setDocupi] = useState('')
    const [showWarning, setShowWarning] = useState(false);
    const [specialization, setSpecialization] = useState('');
    const [specializations] = useState(['Neurologist', 'Dentist', 'Gynecologist', 'Pediatrician', 'ENT Specialist', 'General Medicine']);
    const [image, setImage] = useState(null);


    const handleSave = async () => {
        if (!specialization || !name || !email || !password || !hospital || !age || !gender || !image) {
            setShowWarning(true);
            return;
        }
        setShowWarning(false);
        onSave({ name, email, password, age, gender, hospital, paymentupi, specialization, image });
        setName('');
        setEmail('');
        setPassword('');
        setAge('');
        setGender('');
        setHospital('')
        setDocupi('');
        setSpecialization('');
        setImage(null);
        window.location.reload();
    };

    const handleClose = () => {
        setShowWarning(false);
        onCancel();
    };

    const handleImageChange = (e) => {
        console.log(e)
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result);
        }
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    };

    const isSaveDisabled = specialization === '';

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <h2>Add Doctor</h2>
                {image == '' || image == null ? "" : <img src={image} width={100} height={100} style={{borderRadius:'20px'}} alt="no image" />}
                <input className='inputbox' type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /> <br />
                <input className='inputbox' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /> <br />
                <input className='inputbox' type="password" placeholder="Password" value={password} minLength={8} onChange={(e) => setPassword(e.target.value)} required /> <br />
                <input className='inputbox' type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required /> <br />
                <input className='inputbox' type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} required /> <br />
                <input className='inputbox' type="text" placeholder="Name of the hospital" value={hospital} onChange={(e) => setHospital(e.target.value)} required /> <br />
                <input className='inputbox' type="text" placeholder="Payment UPI ( Optional )" value={paymentupi} onChange={(e) => setDocupi(e.target.value)} /> <br />

                <select style={{ color: 'gray' }} className='inputbox' value={specialization} onChange={(e) => { setSpecialization(e.target.value); e.target.style.color = '' }} required>
                    <option value="" disabled>Specialization</option>
                    {specializations.map(spec => (
                        <option style={{ color: 'black' }} key={spec} value={spec}>{spec}</option>
                    ))}
                </select><br />
                Doctor Profile Pic <input type="file" accept=".png, .jpg , .jpeg" name='photo' onChange={handleImageChange} />
                {showWarning && <p style={warningData} className="warning">Please select all the fields.</p>}
                <div className="button-container">
                    <button className='btn-common' onClick={handleSave}>Save</button>
                    <button className='btn-common' onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
const warningData = {
    backgroundColor: 'red',
}
export default AddDoctorModal;

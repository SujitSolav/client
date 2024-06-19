import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [showRoleField, setShowRoleField] = useState(false);

  const handleRoleSelection = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const registerData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      role: role,
      specialty: role === 'doctor' ? event.target.specialty?.value : undefined,
      medicalHistory: role === 'patient' ? event.target.medicalHistory?.value : undefined,
    };

    try {
      const res = await axios.post('http://127.0.0.1:5000/api/user/register', registerData);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
  };

  return (
    <div className='authentication'>
      <div className='authenticationForm card p-3'>
        <h1 className='card-title'>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" autoComplete='' id="name" name="name" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" autoComplete='' id="email" name="email" placeholder="Enter email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" autoComplete='' className="form-control" id="password" name="password" placeholder="Password" required />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowRoleField(!showRoleField)}
            >
              Select Role
            </button>
          </div>
          {showRoleField && (
            <>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select className="form-control" id="role" autoComplete='' name="role" onChange={handleRoleSelection} required>
                  <option value="">Select Role</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                </select>
              </div>
              {role === 'doctor' && (
                <div className="form-group">
                  <label htmlFor="specialty">Specialty</label>
                  <input type="text"  autoComplete='' className="form-control" id="specialty" name="specialty" placeholder="Enter your specialty" required />
                </div>
              )}
              {role === 'patient' && (
                <div className="form-group">
                  <label htmlFor="medicalHistory">Medical History</label>
                  <textarea className="form-control" autoComplete='' id="medicalHistory" name="medicalHistory" placeholder="Enter your medical history" />
                </div>
              )}
            </>
          )}
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
}
 
export default Register;

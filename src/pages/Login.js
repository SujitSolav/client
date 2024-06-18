import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = {
      email: event.target.email.value,
      password: event.target.password.value,
      role: event.target.role.value,
    };
    
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/user/login', loginData);
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('userId', res.data.UserId);  // Store the UserId in localStorage
        toast("Redirecting to Dashboard");
        if (res.data.role === 'doctor') {
          navigate(`/doctor`);
        } else if (res.data.role === 'patient') {
          navigate(`/patient`);
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  return (
    <div className='authentication'>
      <div className='authenticationForm card p-3'>
        <h1 className='card-title'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" autoComplete='' className="form-control" id="email" name="email" placeholder="Enter email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" autoComplete='' className="form-control" id="password" name="password" placeholder="Password" required />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select className="form-control" id="role" name="role" autoComplete='' required>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <Link to='/register' className='anchor'>GO TO Register</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

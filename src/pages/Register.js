import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'

function Register() {
  const navigate =useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const formData = {
      name:event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    try {
      const res= await axios.post('http://127.0.0.1:5000/api/user/register' , formData) ;
      if(res.data.success){
        toast.success(res.data.message  )
        toast("Redirecting to Login Page")
        navigate('/login')
      }else{
        toast.error(res.data.error)
      }
    } catch (error) {
      console.log(error)
    }

    console.log(formData);
  };

  return (
    <div className='authentication'>
      <div className='authenticationForm card p-3'>
        <h1 className='card-title'>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" autoComplete='' id="name" name="name" placeholder="Name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" autoComplete=''  name="email" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" autoComplete='' id="password" name="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
          <Link to='/login' className='anchor'>GO TO LOGIN</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;

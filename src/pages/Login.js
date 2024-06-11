import React  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'

function Login() {
  const navigate =useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const loginData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    console.log(loginData);
    try {
      const res  = await axios.post('http://127.0.0.1:5000/api/user/login' , loginData) ;
      if(res.data.success){
        toast.success(res.data.message  )
        localStorage.setItem('token', res.data.token)
        toast("Redirecting to Home Page") 
        navigate('/')
      }else{
        toast.error(res.data.error)
      }
    } catch (error) {
      console.log(error)
    }

    console.log(loginData);
  };
  return (
    <div className='authentication'>
    <div className='authenticationForm card p-3'>
      <h1 className='card-title'>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" autoComplete='' id="email" name="email" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" autoComplete='' className="form-control" id="password" name="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <Link to='/register' className='anchor'>GO TO Register</Link>
      </form>
    </div>
  </div>
  );
}

export default Login;

import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Doctor-Patient Appointment System</h1>
      <div style={{ marginTop: '30px' }}>
        <h2>Are you a Doctor?</h2>
        <Link to="/login/doctor">
          <button style={{ margin: '10px' }}>Doctor Login</button>
        </Link>
        <Link to="/register/doctor">
          <button style={{ margin: '10px' }}>Doctor Register</button>
        </Link>
      </div>
      <div style={{ marginTop: '30px' }}>
        <h2>Are you a Patient?</h2>
        <Link to="/login/patient">
          <button style={{ margin: '10px' }}>Patient Login</button>
        </Link>
        <Link to="/register/patient">
          <button style={{ margin: '10px' }}>Patient Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;

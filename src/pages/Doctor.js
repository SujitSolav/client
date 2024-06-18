import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState(initialState);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); 
        const res = await axios.get(`http://127.0.0.1:5000/api/user/appointments?doctorId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }); 
        console.log(res);
        if (res.data.success) {
          setAppointments(res.data.data);
        } else {
          toast.error('Failed to fetch appointments');
        }
      } catch (error) {
        console.error(error);
        toast.error('Server Error');
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/user/users');
        if (res.data.success) {
          setUsers(res.data.data);
        } else {
          toast.error('Failed to fetch doctors');
        }
      } catch (error) {
        console.error(error);
        toast.error('Server Error');
      }
    };

    fetchusers();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Appointments</h1>
      {appointments.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {appointments.map((appointment) => (
            <li key={appointment._id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px', borderRadius: '5px' }}>
              <p style={{ margin: '5px 0' }}><strong>Date:</strong> {appointment.date}</p>
              <p style={{ margin: '5px 0' }}><strong>Patient:</strong> {appointment.patient}</p>
              {/* Add more appointment details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center', color: '#999' }}>No appointments available</p>
      )}
    </div>
  );
}

export default DoctorDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const res = await axios.get(`http://127.0.0.1:5000/api/user/appointments?doctorId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
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

  

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Appointments</h1>
      {appointments.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {appointments.map((appointment) => (
            <li
              key={appointment._id}
              style={{
                border: '1px solid #ccc',
                margin: '10px 0',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              <p style={{ margin: '5px 0' }}>
                <strong>Date:</strong> {new Date(appointment.date).toLocaleString()}
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>Patient:</strong> {appointment.patient.name || 'Unknown'}
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>Status:</strong> {appointment.status ? 'Pending' : 'Accepted'}
              </p>
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


  // const handleAccept = async (appointmentId) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const res = await axios.put(`http://127.0.0.1:5000/api/user/appointment/${appointmentId}/accept`, {}, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     if (res.data.success) {
  //       toast.success('Appointment accepted');
  //       setAppointments(appointments.map(app => app._id === appointmentId ? { ...app, status: 'accepted' } : app));
  //     } else {
  //       toast.error('Failed to accept appointment');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Server Error');
  //   }
  // };

  // const handleReject = async (appointmentId) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const res = await axios.put(`http://127.0.0.1:5000/api/user/appointment/${appointmentId}/reject`, {}, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     if (res.data.success) {
  //       toast.success('Appointment rejected');
  //       setAppointments(appointments.map(app => app._id === appointmentId ? { ...app, status: 'rejected' } : app));
  //     } else {
  //       toast.error('Failed to reject appointment');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Server Error');
  //   }
  // };

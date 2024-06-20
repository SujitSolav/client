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

  const handleChangeStatus = async (appointmentId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://127.0.0.1:5000/api/user/changeStatus',
        {
          appointmentId,
          status: newStatus
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        // Update the appointment status in the local state
        setAppointments(appointments.map(app =>
          app._id === appointmentId ? { ...app, status: newStatus } : app
        ));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to change status');
    }
  };

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
                <strong>Patient:</strong> {appointment.patient.name}
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>Patient_id:</strong> {appointment.patient._id}
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>Status:</strong> 
                <select 
                  value={appointment.status} 
                  onChange={(e) => handleChangeStatus(appointment._id, e.target.value)} 
                  className="form-control" 
                  id="status" 
                  name="status" 
                  required
                >
                  <option value="Pending">Pending</option> 
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
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

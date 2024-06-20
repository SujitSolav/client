import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function PatientDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [myAppointments, setMyAppointments] = useState([]);
  const [status, setStatus] = useState('Pending');

  const userId = localStorage.getItem('userId');

  // Fetch appointments when the component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://127.0.0.1:5000/api/user/getAppointmentsById?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setMyAppointments(res.data.data);
        } else {
          toast.error('Failed to fetch appointments');
        }
      } catch (error) {
        console.error(error);
        toast.error('Server Error');
      }
    };

    fetchAppointments();
  }, );

  // Fetch doctors when the component mounts


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/user/doctors');
        if (res.data.success) {
          setDoctors(res.data.data);
        } else {
          toast.error('Failed to fetch doctors');
        }
      } catch (error) {
        console.error(error);
        toast.error('Server Error');
      }
    };

    fetchDoctors();
  }, []);

  // Handle booking an appointment
  const handleBookAppointment = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://127.0.0.1:5000/api/user/book-appointment',
        {
          doctorId: selectedDoctor,
          appointmentDate,
          userId,
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setSelectedDoctor(null);
        setAppointmentDate('');
        setStatus('Pending');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Booking failed');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Doctors List</h1>
      {doctors.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {doctors.map((doctor) => (
            <li key={doctor._id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px', borderRadius: '5px' }}>
              <h2 style={{ margin: '5px 0' }}>{doctor.name}</h2>
              <p style={{ margin: '5px 0' }}><strong>Specialty:</strong> {doctor.specialty}</p>
              <p style={{ margin: '5px 0' }}><strong>Email:</strong> {doctor.email}</p>
              <button
                style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                onClick={() => setSelectedDoctor(doctor._id)}
              >
                Book Appointment
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center', color: '#999' }}>No doctors available</p>
      )}

      {selectedDoctor && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2 style={{ color: '#333' }}>Book Appointment</h2>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            style={{ padding: '5px', borderRadius: '3px', border: '1px solid #ccc', marginBottom: '10px' }}
          />
          <br />
          <button
            onClick={handleBookAppointment}
            style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '10px' }}
          >
            Confirm
          </button>
          <button
            onClick={() => setSelectedDoctor(null)}
            style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      )}




      <h1 style={{ textAlign: 'center', color: '#333' }}>My Appointments</h1>
      {myAppointments.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {myAppointments.map((appointment) => (
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
                <strong>Doctor:</strong> {appointment.doctor.name || 'Unknown'}
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>Status:</strong> {appointment.status}
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

export default PatientDashboard;

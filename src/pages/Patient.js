import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from './Modal';
import img6 from './images/img6.jpg'
import img7 from './images/img7.jpg'


function PatientDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [myAppointments, setMyAppointments] = useState([]);
  const [status, setStatus] = useState('Pending');
  const [activeTab, setActiveTab] = useState('doctors');
  const [showModal, setShowModal] = useState(false);

  const userId = localStorage.getItem('userId');

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
  },);

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
        setShowModal(false); // Close the modal after booking
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Booking failed');
    }
  };

  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif' }}>
      {/* Vertical Navbar */}
      <div style={{ width: '260px', background: '#e2fffeda', padding: '20px', borderRight: '2px solid #ccc' }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Menu</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <button
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: activeTab === 'doctors' ? '#007bff' : 'transparent',
                color: activeTab === 'doctors' ? 'white' : '#333',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
              onClick={() => setActiveTab('doctors')}
            >
              Doctors
            </button>
          </li>
          <li>
            <button
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: activeTab === 'appointments' ? '#007bff' : 'transparent',
                color: activeTab === 'appointments' ? 'white' : '#333',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
              onClick={() => setActiveTab('appointments')}
            >
              Appointments
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        {activeTab === 'doctors' && (
          <div style={{display:'flex' }}>
           <div>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Doctors List</h1>
            {doctors.length > 0 ? (
              <ul style={{ listStyleType: 'none', padding: '10px', width:'350px' }}>
                {doctors.map((doctor) => (
                  <li key={doctor._id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px', borderRadius: '5px' }}>
                    <h2 style={{ margin: '5px 0' }}>{doctor.name}</h2>
                    <p style={{ margin: '5px 0' }}><strong>Specialty:</strong> {doctor.specialty}</p>
                    <p style={{ margin: '5px 0' }}><strong>Email:</strong> {doctor.email}</p>
                    <button
                      style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedDoctor(doctor._id);
                        setShowModal(true);
                      }}
                    >
                      Book Appointment
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ textAlign: 'center', color: '#999' }}>No doctors available</p>
            )}
            </div>
            <div>
              <img style={{height:'410px', margin:'76px', borderRadius:'50px'}} src={img6} alt="" />
            </div>
          </div>
           
        )}

        {activeTab === 'appointments' && (
          <div style={{display:'flex'}}>
            <div>
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
            <div>
              <img style={{height:'410px', margin:'76px', borderRadius:'50px'}} src={img7} alt="" />
            </div>
          </div>
        )}

        <Modal show={showModal} onClose={() => setShowModal(false)}>
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
            onClick={() => {
              setSelectedDoctor(null);
              setShowModal(false);
            }}
            style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default PatientDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Container, Card, Form, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const doctorName = localStorage.getItem('doctorName') || 'Doctor';

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
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ 
          height: 'auto', 
          width: '290px', 
          // position: 'fixed', 
          top: '56px', // Adjust this if the height of the Navbar changes
          left: '0', 
          backgroundColor: '#343a40', 
          paddingTop: '20px', 
          color: 'white' 
        }}>
          <h2 style={{ textAlign: 'center' }}>{doctorName}</h2>
          <Nav className="flex-column" style={{ paddingLeft: '10px' }}>
            <Nav.Link href="#home" style={{ color: 'white', padding: '15px', textDecoration: 'none' }}>Home</Nav.Link>
            <Nav.Link href="#profile" style={{ color: 'white', padding: '15px', textDecoration: 'none' }}>Profile</Nav.Link>
            <Nav.Link href="#appointments" style={{ color: 'white', padding: '15px', textDecoration: 'none' }}>Appointments</Nav.Link>
            <Nav.Link href="#settings" style={{ color: 'white', padding: '15px', textDecoration: 'none' }}>Settings</Nav.Link>
          </Nav>
        </div>
        <div style={{ marginLeft: '50px', padding: '20px', width: '100%' }}>
          <Container className="my-5">
            <h1>Appointments</h1>
            {appointments.length > 0 ? (
              <div style={{ width: '400px' }}>
                {appointments.map((appointment) => (
                  <Card key={appointment._id} className="mb-3">
                    <Card.Body>
                      <Card.Title>
                        <strong>Patient Name: </strong>{appointment.patient.name}
                      </Card.Title>
                      <Card.Text>
                        <strong>Date:</strong> {new Date(appointment.date).toLocaleString()}
                      </Card.Text>
                      <Card.Text>
                        <strong>Status:</strong>
                      </Card.Text>
                      <Form.Select 
                        value={appointment.status} 
                        onChange={(e) => handleChangeStatus(appointment._id, e.target.value)} 
                      >
                        <option value="Pending">Pending</option> 
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </Form.Select>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted">No appointments available</p>
            )}
          </Container>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;

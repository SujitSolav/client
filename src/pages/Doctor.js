import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Container, Card, Form, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import img8 from './images/img8.jpg';

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
const name= localStorage.getItem('userName')

  return (
    <div style={{ 
      height: '100vh', 
      backgroundImage: `url(${img8})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      overflow: 'auto'
    }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ 
          width: '290px', 
          backgroundColor: '#343a40', 
          paddingTop: '20px', 
          color: 'white', 
          position: 'fixed', 
          height: '100%'
        }}>
          {/* <h2 style={{ textAlign: 'center' }}>{doctorName}</h2> */}
          <h4 style={{ textAlign: 'center', color: '#333' }}> <strong style={{color: 'white'}} > Profile </strong>  </h4>
          <h5 style={{textAlign:'center'}}>Name : {name} </h5> 
          <hr></hr>
          <Nav className="flex-column" style={{ paddingLeft: '10px' }}>
            <Nav.Link href="/Home" style={{ color: 'white', padding: '15px', textDecoration: 'none' }}>Home</Nav.Link>
            <Nav.Link href="/doctor" style={{ color: 'white', padding: '15px', textDecoration: 'none' }}>Profile</Nav.Link>
            <Nav.Link href="/doctor" style={{ color: 'white', padding: '15px', textDecoration: 'none' }}>Appointments</Nav.Link>
          </Nav>
        </div>
        <div style={{ marginLeft: '290px', padding: '20px', width: '100%' }}>
          <Container className="my-5">
            <h1 style={{position:'relative', top:'-40px' }}>Appointments</h1>
            {appointments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width:'40%' }}>
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

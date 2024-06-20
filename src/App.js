import React from 'react';
// import {BrowserRouter , Route , Routes} from 'react-router-dom';
// import Login from './pages/Login'
// import Register from './pages/Register'
import { Toaster } from 'react-hot-toast';
// import Home from './pages/Home';
// import Doctor from './pages/Doctor';
// import Patient from './pages/Patient';
import {Outlet} from  'react-router-dom';
import Navbar from './pages/Navbar';

function App() {
  return (
    // <BrowserRouter>
    // <Toaster position="top-center" reverseOrder={false}/>
    
    //   <Routes>
    //     <Route path='/login' element={<Login/>}/>
    //     <Route path='/register' element={<Register/>}/>
    //     <Route path='/' element={<Home/>}/>
    //     <Route path='/doctor' element={<Doctor/>} />
    //     <Route path='/patient' element={<Patient/>}/>
    //   </Routes>
    // </BrowserRouter>
    <>
       <Toaster position="top-center" reverseOrder={false}/>
      <Navbar/>
      <Outlet/>
    
    </>

  );
}

export default App;

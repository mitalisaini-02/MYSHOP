import React, { useEffect, useState } from 'react';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar'; // fixed casing
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add';
import Login from './component/Login'; // use uppercase for components
import List from './pages/List';
import Order from './pages/orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backend = import.meta.env.VITE_BACKEND_URL;
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);
  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer />
      {token === '' ? (

        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">

              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/order" element={<Order token={token} />} />
                <Route path="/" element={<h1>Welcome to Admin Dashboard</h1>} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>  
  );
};

export default App;

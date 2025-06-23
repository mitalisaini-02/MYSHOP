import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { backend } from '../App'; // Import the backend URL from App.jsx
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backend + '/api/user/adminlogin', {
                email,
                password
            });
            if(response.data.success){
                setToken(response.data.token); // Assuming the token is returned in the response
            }else{
                toast.error(response.data.message);
            }
           } catch (error) {
            console.error("Login failed:", error);
            toast.error(error.message);
        }
    }



    return (
        <div className='bg-gray-100 w-full min-h-screen flex items-center justify-center'>

            <div className='rounded-lg bg-white shadow-md p-6 m-w-md mx-auto mt-10'>
                <h1 className='text-2xl mb-3'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 minw-74'><p className='text-gray-600 font-medium text-sm mt-2'>Email Address</p>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className ="border border-gray-300 p-2  outline-none w-full rounded-md" type="email" placeholder="Enter your email" />
                    </div>
                    <div>
                        <p className='text-gray-600 font-medium text-sm mt-2'>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className="border border-gray-300 p-2  outline-none w-full rounded-md" type="password" placeholder="Enter your password" />
                    </div>
                    <button className='mt-2 w-full py-3 rounded-md text-white bg-black' type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;


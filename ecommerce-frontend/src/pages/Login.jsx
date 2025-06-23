import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Login = () => {
  const [currentState, setCurrentState] = useState('login');
  const { token, setToken, navigate, backend } = useContext(ShopContext);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'signup') {
        const response = await axios.post(`${backend}/api/user/register`, {
          name, email, password
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backend}/api/user/login`, {
          email, password
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

   return (
    <div className="w-full min-h-screen flex justify-center items-center px-4">
      <form
        onSubmit={onsubmitHandler}
        className="w-full max-w-md bg-[#f9f9f9] rounded-lg shadow-md p-8 space-y-6 text-gray-800"
      >
        <div className="text-center">
          <h2 className="text-3xl font-semibold capitalize mb-2">
            {currentState === 'login' ? 'Welcome Back!' : 'Create an Account'}
          </h2>
          <p className="text-sm text-gray-500">
            {currentState === 'login'
              ? 'Sign in to continue shopping'
              : 'Sign up to explore the latest fashion'}
          </p>
        </div>

        {currentState === 'signup' && (
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Username"
            required
            autoFocus
            aria-label="Username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Email address"
          required
          autoFocus={currentState === 'login'}
          aria-label="Email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
          required
          aria-label="Password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
        />

        <div className="flex justify-between text-sm text-gray-600">
          <p className="cursor-pointer hover:text-black">Forgot password?</p>
          <p
            onClick={() => setCurrentState(currentState === 'login' ? 'signup' : 'login')}
            className="cursor-pointer hover:text-black"
          >
            {currentState === 'login' ? 'Create account' : 'Already have an account?'}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
        >
          {currentState === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};


export default Login;

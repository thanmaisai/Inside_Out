import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Input Validation (optional, but recommended)
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5173//register', {
        name,
        email,
        password,
      });

      if (response.data.message === 'User registered successfully') {
        alert(response.data.message);
        navigate('/login'); // Redirect to login page on success
      } else {
        alert(response.data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className='mb-3 custom-text-color'>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label htmlFor="exampleInputname" className="form-label">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              id="exampleInputname"
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="exampleInputEmail1" className="form-label">
              <strong>Email Id</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="exampleInputPassword1" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>

        <p className='container my-2'>Already have an account ?</p>
        <Link to='/login' className="btn btn-secondary">Login</Link>
      </div>
    </div>
  );
};

export default Register;

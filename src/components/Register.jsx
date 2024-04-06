import React, { useState } from 'react';

const Register = ({handleRegister, registered}) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    player: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });

    console.log(userData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert('Passwords do not match');
    } else {
      handleRegister(userData)
      registered();
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={userData.email} onChange={e => handleChange(e)} required name="email"/>
        </div>
        <div className="form-group">
          <label>username</label>
          <input type="text" value={userData.username} onChange={e => handleChange(e)} required name="username"/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={userData.password} onChange={e => handleChange(e)} required name="password"/>
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" value={userData.confirmPassword} onChange={e => handleChange(e)} required name="confirmPassword"/>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;




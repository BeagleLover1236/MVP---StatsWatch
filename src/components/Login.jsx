import React, { useState } from 'react';
import Register from './Register.jsx';
const Login = ({handleSuccesfulLogin, handleRegister, handleLogin, loginData, onChangeLogin}) => {
  const [showRegister, setShowRegister] = useState(false);

  const registered = () => {
    setShowRegister(false)
  }

  return (
    <div className="page-container">
      <div className="header">
        <h1>StatsWatch</h1>
      </div>
    <div className="login-container">
      {showRegister ? (
        <Register handleRegister={handleRegister} registered={registered}/>
      ) : (
        <>
        <h1>Log In</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={loginData.email} name="email" onChange={(e) => {
                onChangeLogin(e)
              }}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={loginData.password} name="password" onChange={(e) => {
                onChangeLogin(e)
              }}/>
            </div>
            <button type="submit">Login</button>
          </form>
          <p>
            Dont have an account? <a href="#" onClick={() => setShowRegister(true)}>Sign up</a>
          </p>
        </>
      )}
    </div>
    </div>
  );
};

export default Login;
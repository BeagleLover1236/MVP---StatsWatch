import React, { useState, useEffect } from 'react';
import Login from './Login.jsx';
import Welcome from './Welcome.jsx';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [account, setAccount] = useState('')
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [isSearched, setIsSearched] = useState(false);
  const [profileLinked, setProfileLinked] = useState(false);

  const handleProfileLinked = (boolean) => {
    setProfileLinked(boolean);
  }

  useEffect(() => {
    axios.get(`/statswatchUsers/${account.email}`)
    .then((data) => {
      console.log(data.data)
      setAccount(data.data)
    })
    .catch(() => {
      console.log('Error getting user')
    })

  }
  , [profileLinked]);

  useEffect(() => {
    axios.get(`/statswatchUsers/${account.email}`)
    .then((data) => {
      console.log(data.data)
      setAccount(data.data)
    })
    .catch(() => {
      console.log('Error getting user')
    })

  }
  , []);


  const handleRegister = (entry) => {
    axios.post('/statswatchUsers/users', entry)
    .then(() => {
      console.log('User registered!')

     })
    .catch(() => { console.log('Error registering user');
    alert('Email already in use') })

  }

  const onChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    axios.get(`/statswatchUsers/${loginData.email}`)
    .then((data) => {
      console.log(data.data)
      if(data.data.password !== loginData.password || data.data.email !== loginData.email) {
        alert('Invalid email or password')
      } else {
        console.log('User logged in!')
        handleSuccesfulLogin()
      }
      setAccount(data.data)
     })
    .catch(() => { console.log('Error logging in user') })
  }

  const handleSuccesfulLogin = () => {
    setLoggedIn(true);
  }
  return (
    <>
      {loggedIn ? (<Welcome account={account} handleProfileLinked={handleProfileLinked}/>) : (<Login handleSuccesfulLogin={handleSuccesfulLogin} handleLogin={handleLogin} handleRegister={handleRegister} loginData={loginData} onChangeLogin={onChangeLogin}/>)}
    </>

  )
}

export default App;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import route from '../route';
import axios from 'axios'

const Login = () => {
  const  navigate=useNavigate()
  const [loginDetails,setDetails]=useState({
    email:"",
    password:""
  });
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const{status,data}=await axios.post(`${route()}signin`,loginDetails,{Headers:{"Content-Type":"application/json"}});
      if(status==200){
        localStorage.setItem("Auth",data.token)
      alert(data.msg)
      navigate('/')
      }
      else{
        alert(data.msg)
      }
    } catch (error) {
      alert("error occured")

    }
  }
  const handleChange=(e)=>{
    setDetails((pre)=>({...pre,[e.target.name]:e.target.value}))
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
            type="email" 
            name='email'
            placeholder="Email" 
            onChange={handleChange}
            required 
            />
          </div>
          <div className="input-group">
            <input 
            type="password" 
            name='password'
            placeholder="Password" 
            onChange={handleChange}
            required 
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
          <p style={{textAlign:'center',color:'white',fontSize:'13px'}}>Login with social media accounts </p>
        
        <div className="social-login">
          <button className="google-btn">
            <img src="/google.png" alt="Google" />
          </button>
          <button className="facebook-btn">
            <img src="/fb.png" alt="Facebook" />
          </button>
        </div>

        <div className="links">
          <a href="/forgot-password">Forgot Password?</a>
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

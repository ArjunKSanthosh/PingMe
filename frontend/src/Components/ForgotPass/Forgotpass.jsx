import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import route from '../route';
import './Forgotpass.scss'

const ForgotPass = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState(''); 

  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = async(event) => {
    event.preventDefault(); 
    const {status,data}=await axios.post(`${route()}forgotpassword`,{email},{Headers:{"Content-Type":"application/json"}});
    
    if(status===201){
      localStorage.setItem('email',email);
      alert(data.msg);
      navigate('/login')
    }else if(status===403){
      alert(data.msg)
    }
    else{
      alert(data.msg)
    }
  };
  return (
    <div className='ForgotPass'>
<div class="form-container">
      <div class="logo-container">
        Forgot Password
      </div>

      <form class="form"  onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Enter your email" onChange={handleChange}/>
        </div>

        <button type='submit'>
          <span>Continue</span>
          
        </button>

      </form>

      <p class="signup-link">
        Don't have an account?
        <a href="/signup" class="signup-link link"> Sign up now</a>
      </p>
    </div>
    </div>
  )
}

export default ForgotPass;
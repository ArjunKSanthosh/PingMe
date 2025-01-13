import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import route from '../route';
import axios from 'axios';
import './Signup.scss';
import { use } from 'react';

const SignUp = () => {
    const navigate=useNavigate();
// const [showPassword,setShowPassword]=useState(false)
// const [showCPassword, setShowCPassword] = useState(false);
const [user,setUser]=useState({
    email:"",
    username:"",
    profile:"",
    password:"",
    cpassword:"",
    phone:""
})
const handleChange=(e)=>{
    setUser((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        console.log(user);
        
        const {data,status}=await axios.post(`${route()}signup`,user,{headers:{"Content-Type":"application/json"}})
        if(status===201){
            localStorage.removeItem('email')
            alert(data.msg);
            navigate('/login')
        }
        else{
            alert(data.msg)
            console.log(data.msg);
            
        }
    } catch (error) {
        alert("error occured")
    }
}
const handleFile=async(e)=>{
    const profile=await convertToBase64(e.target.files[0])
    setUser((pre)=>({...pre,profile:profile}))
  }
  function convertToBase64(file) {
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror= (error)=>{
            reject(error)
        }
    })
  }
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>

        {/* Image Upload Section */}
        <div className="image-upload-section">
          <div className="image-preview">
            {user.profile ? (
              <img src={user.profile} alt="Profile Preview" />
            ) : (
              <p>No image selected</p>
            )}
          </div>
          <label htmlFor="image-upload" className="add-image-btn">
                <img src="photo.png" alt="" className='camera' />           
 <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFile}
            />
          </label>
        </div>

        {/* Sign-Up Form */}
        <form className="signup-form">
          <div className="input-group">
            <input 
            type="email" 
            placeholder="Email" 
            name='email'
            onChange={handleChange} 
            />
          </div>
          <div className="input-group">
            <input 
            type="tel" 
            placeholder="Phone Number" 
            name='phone' 
            onChange={handleChange} 
            />
          </div>
          <div className="input-group">
            <input 
            type="text" 
            placeholder="Username" 
            name='username'
            onChange={handleChange} 
            />
          </div>
          <div className="input-group">
            <input 
            type="password" 
            placeholder="Password" 
            name='password'
            onChange={handleChange} 
            />
          </div>
          <div className="input-group">
            <input 
            type="password" 
            placeholder="Confirm Password" 
            name='cpassword'
            onChange={handleChange} 
            />
          </div>
          <button type="submit" className="register-btn" onClick={handleSubmit}>Register</button>
        </form>
        
        <div className="links">
          <p style={{color:'white'}}>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

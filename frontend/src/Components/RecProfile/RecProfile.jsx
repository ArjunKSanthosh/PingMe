import React,{useState,useEffect} from 'react';
import './Recprofile.scss'
import { useNavigate,useParams } from 'react-router-dom';
import axios from "axios";
import route from "../route";

const RecProfile = () => {
    const {id}=useParams();
    const navigate=useNavigate()
    const value = localStorage.getItem("Auth");
    const [recProfile, setRecProfile] = useState({});

    useEffect(()=>{
        getDetails()
    },[])
       
    const getDetails=async()=>{
        try {
            const { status, data } = await axios.get(`${route()}recprofile/${id}`, {
                headers: { "Authorization": `Bearer ${value}` }
              });
              if(status==200){
                setRecProfile(data)
              }
              else{
                alert(data.msg)
              }
        } catch (error) {
            navigate('/login')
        }
    }

  return (
    <div className="containerr">
      <h3>USER DETAILS</h3>
    <div className="profile-card">
      <div className="avatar">
        <div className="img_container">
         <img 
         src={recProfile.profile} 
         alt="Pro img" />
          <div className="bg-overlay"></div>
        </div>
      </div>
      <div className="headings">
        <p className="name">{recProfile.username}</p>
      </div>
      <div className="details">
        <ul>
          <li>
          <img src="/phone.png" alt="" id='phone' className='icon' />

            <p>{recProfile.phone}</p>
          </li>
          <li>
            
            <img src="/mail.png" alt="" id='mail' className='icon' />
            <p>{recProfile.email}</p>
          </li>
        </ul>
      </div>
      <hr className="divider" />
    </div>
    </div>
  );
};

export default RecProfile;

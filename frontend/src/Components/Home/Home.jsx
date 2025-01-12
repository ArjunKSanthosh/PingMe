import React, { useEffect, useState } from "react";
import './home.scss'
import { useNavigate } from "react-router-dom";
import route from "../route";
import axios from "axios";
import Nav from "../Navbar/Nav";

const Home = () => {
  const value=localStorage.getItem('Auth')
  const navigate = useNavigate();
  const [chatMember,setChatMembers]=useState([])
  
  useEffect(()=>{
          useDetails();
        },[])
  const useDetails=async()=>{
    try {
      const {status,data}=await axios.get(`${route()}home`,{headers:{"Authorization":`Bearer ${value}`}})
      if(status==200){
        setChatMembers([...new Map(data.chatMember.map(member => [member._id, member])).values()]);
      }
      else{
        alert(data.msg)
        navigate('/login')
      }
    } catch (error) {
      navigate('/login')
      
    }
  }

  return (
    <div className="app-container">
      <Nav/>
      <div className="container">
            {chatMember.map((member,ind)=> <Link to={`/chatcard/${member._id}`} className="content" key={ind}>
                    <img src={member.profile} alt={member.username} />
                    <p>{member.username}</p>
                </Link>
            )}
          <button className="show-users-icon" onClick={()=>{navigate('/listpeople')}}>
                <img src="/chat2.png" alt="" />
          </button>
        </div>
      </div>
  
  );
};

export default Home;  

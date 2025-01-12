import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import route from "../route";
import axios from "axios";
import Nav from "../Navbar/Nav";
import './Listpeople.scss'

const Listpeople=()=>{
    const navigate=useNavigate()
    const value=localStorage.getItem('Auth')
    const [people,setpeople]=useState([])
useEffect(()=>{
    getDetails();
},[])
const getDetails=async()=>{
    try {
        const{status,data}=await axios.get(`${route()}listpeople`,{headers:{"Authorization":`Bearer ${value}`}})
        console.log(data.people);
        
        if(status==200){
            setpeople(data.people)
        }
        else{
            alert(data.msg)
            // navigate('/login')
        }

    } catch (error) {
        // navigate('/login')

    }
}
    return(
        <div className="app-container">
      <Nav/>
      <div className="container">
            {people.map((users,ind)=> <Link to={`/chatcard/${users._id}`} className="content" key={ind}>
                    <img src={users.profile} alt={users.username} />
                    <p>{users.username}</p>
                </Link>
            )}
        </div>
      </div>
    )
}
export default Listpeople
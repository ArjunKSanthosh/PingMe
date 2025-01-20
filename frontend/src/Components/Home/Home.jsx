import React, { useEffect, useState } from "react";
import './home.scss';
import { Link, useNavigate } from "react-router-dom";
import route from "../route";
import axios from "axios";
import Nav from "../Navbar/Nav";

const Home = () => {
  const value = localStorage.getItem('Auth');
  const navigate = useNavigate();
  const [chatMember, setChatMembers] = useState([]);
  const [counts, setCounts] = useState([]);
  const [lmessages, setLmessages] = useState([]);

  useEffect(() => {
    useDetails();
  }, []);

  const useDetails = async () => {
    try {
      const { status, data } = await axios.get(`${route()}home`, { headers: { "Authorization": `Bearer ${value}` } });
      if (status === 200) {
        setChatMembers(data.chatmembers);
        setCounts(data.counts);
        setLmessages(data.lmessages);
      } else {
        alert(data.msg);
        navigate('/login');
      }
    } catch (error) {
      navigate('/login');
    }
  };

  return (
    <div className="app-container">
      <Nav />
      <div className="container">
        <h3>CHATS</h3>
        {chatMember.map((member, ind) => (
          <Link to={`/chatcard/${member._id}`} className="chat-item" key={ind}>
            <div className="chat-left">
              <img src={member.profile} alt={member.username} className="chat-img" />
            </div>
            <div className="chat-right">
              <div className="chat-header">
                <p className="username">{member.username}</p>
                {counts[ind] > 0 && <span className="count">({counts[ind]})</span>}
              </div>
              <p className={`message ${lmessages[ind].seen ? 'seen' : ''}`}>
                {lmessages[ind].message}
              </p>
            </div>
          </Link>
        ))}
        <button className="show-users-icon" onClick={() => { navigate('/listpeople'); }}>
          <img src="/chat2.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Home;

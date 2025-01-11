import React, { useState } from "react";
import "./Home.scss";

const Home = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => setShowPopover(!showPopover);

  const chats = [
    { id: 1, name: "John Doe", lastMessage: "Hello!", time: "10:30 AM" },
    { id: 2, name: "Jane Smith", lastMessage: "How are you?", time: "9:45 AM" },
    { id: 3, name: "Mike Ross", lastMessage: "Let’s meet tomorrow", time: "8:15 AM" },
  ];

  return (
    <div className="app-container">
      {/* Navbar */}
      <div className="navbar">
        <h1 className="app-title">ChatApp</h1>
        <div className="profile-section">
          <button className="profile-icon" onClick={togglePopover}>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="profile-img"
            />
          </button>
          {showPopover && (
            <div className="popover-menu">
              <button className="popover-btn">Profile</button>
              <button className="popover-btn">Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* Chat Layout */}
      <div className="chat-layout">
        {/* Chat List */}
        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="chat-item"
              onClick={() => setActiveChat(chat)}
            >
              <div className="chat-info">
                <h4 className="chat-name">{chat.name}</h4>
                <p className="chat-message">{chat.lastMessage}</p>
              </div>
              <span className="chat-time">{chat.time}</span>
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {activeChat ? (
            <>
              <div className="chat-header">
                <h2>{activeChat.name}</h2>
              </div>
              <div className="chat-messages">
                <div className="message received">Hi there!</div>
                <div className="message sent">Hello! How are you?</div>
              </div>
              <div className="chat-input">
                <input type="text" placeholder="Type a message" />
                <button>Send</button>
              </div>
            </>
          ) : (
            <div className="chat-area-placeholder">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

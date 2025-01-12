import React from "react";
import "./ChatCard.scss";

const ChatCard = () => {
  // Sample user data
  const users = [
    { id: 1, name: "John Doe", image: "https://via.placeholder.com/50", status: "Online" },
    { id: 2, name: "Jane Smith", image: "https://via.placeholder.com/50", status: "Last seen 5 minutes ago" },
    { id: 3, name: "Mike Ross", image: "https://via.placeholder.com/50", status: "Last seen yesterday" },
    { id: 4, name: "Rachel Zane", image: "https://via.placeholder.com/50", status: "Online" },
    { id: 5, name: "Harvey Specter", image: "https://via.placeholder.com/50", status: "Last seen 2 hours ago" },
  ];

  return (
    <div className="chat-card-container">
      <div className="chat-card-title">Chats</div>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.image} alt={user.name} className="user-image" />
            <div className="user-info">
              <h4 className="user-name">{user.name}</h4>
              <p className="user-status">{user.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;

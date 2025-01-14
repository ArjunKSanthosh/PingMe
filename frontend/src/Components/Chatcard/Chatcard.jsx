import React,{useState,useEffect}from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import "./chatcard.scss";
import axios from "axios";
import route from "../route";
import { IoArrowBack } from 'react-icons/io5';
import { MdSend } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai'; 
import { FiX} from 'react-icons/fi';

const ChatCard = () => {
  const value=localStorage.getItem("Auth")
  const {id}=useParams();
  const [uid,setUid]=useState('')
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState({});
  const [messages, setMessages] = useState([]);
  const [longPressMsg, setLongPressMsg] = useState(null); // State to track long-pressed message
  const [showPopover, setShowPopover] = useState(false); // State to control popover visibility
  const [pressTimer, setPressTimer] = useState(null); // Timer ID for long press detection

  useEffect(()=>{
    getDetails();
  },[])
  const getDetails=async()=>{
      const {status,data}=await axios.get(`${route()}chat/${id}`,{headers:{"Authorization":`Bearer ${value}`}})
      if(status==200){
          setMessages(data.chats);
          setReceiver(data.receiver);
          setUid(data.uid);
      }else{
          alert(data.msg);
          navigate('/login')
      }
  }
  const handleSend = async() => {
    if (message.trim()) {
      const currentDate = new Date(); 
      const [date,time]=currentDate.toLocaleString().split(', ')
      const {status,data}=await axios.post(`${route()}addmessage/${id}`,{message,date,time},{headers:{"Authorization":`Bearer ${value}`}});
      if (status==201) {
        if (data.msg=="success") {
          getDetails();
        }
      }
      setMessage('');
    }
  }; 
  const handleLongPressStart=(msg)=>{
    const timer = setTimeout(() => {
      setLongPressMsg(msg);
      setShowPopover(true);
    }, 500); // 500ms is the threshold for long press

    setPressTimer(timer);
  };
  const handleLongPressEnd = () => {
    // Clear the timer if the press is released early
    clearTimeout(pressTimer);
  };

  const handleDelete = async () => {
    try {
      const { status, data } = await axios.delete(`${route()}deletemessage/${longPressMsg._id}`, {
        headers: { Authorization: `Bearer ${value}` },
      });
      if (status === 201 && data.msg === 'success') {
        setShowPopover(false);
        getDetails();
      }
    } catch (error) {
      alert("Cannot delete others message")
      setShowPopover(false);
    }
  };

  const handleCancel = () => {
    setShowPopover(false);
  };
    return (
      <div className="chat-card">
        <div className="chat-header">
          <Link to={'/'} className="h2">
          <IoArrowBack size={24} color={'white'}  />
          </Link>
          <Link to={`/recprofile/${receiver._id}`} style={{textDecoration:'none'}}>
          <div className="im1">
          <div className="im">
            <img src={receiver.profile} alt="" className="proim" />
          </div>
            <p>{receiver.username}</p>
          </div>
          </Link>
        </div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={(msg.senderId==uid)||(msg.receiver==uid)
            ?`message outgoing`
            :`message incoming`}
            onMouseDown={() => handleLongPressStart(msg)} // Detect long press start
            onTouchStart={() => handleLongPressStart(msg)} // For mobile support
            onMouseUp={handleLongPressEnd} // Handle press end
            onTouchEnd={handleLongPressEnd} // For mobile support
            >
              <p>{msg.message}</p>
              <p className="foot">{msg.time}</p>
              {showPopover && (
                 longPressMsg===msg&&(<div className="popover">
                  <button onClick={handleDelete}>
                    <AiOutlineDelete  /> 

                  </button>
                    <button onClick={handleCancel}><FiX/></button>
                    </div>)
                       )}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={message}
            onChange={(e) =>  setMessage(e.target.value)}
            placeholder="Type your message"
          />
          <button onClick={handleSend}>
            <MdSend size={24} className="snd"/>
          </button>
        </div>
      </div>
    );
};

export default ChatCard;

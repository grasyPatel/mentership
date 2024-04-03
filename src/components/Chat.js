import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Chat = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chat/${id}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages: ', error);
      }
    };

    fetchMessages();
  }, [id]);

  const sendMessage = async () => {
    try {
      await axios.post(`http://localhost:5000/chat/${id}`, { message });
      setMessage('');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  return (
    <div className="chat">
      <h2>Chat with Mentor</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;

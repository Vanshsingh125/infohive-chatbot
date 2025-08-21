import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Get API URL from environment or use localhost for development
  const API_URL = process.env.REACT_APP_API_URL || 'https://infohivechatbot.onrender.com';

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { from: 'user', text: input }]);
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setIsLoading(false);
      setMessages(msgs => [...msgs, { from: 'bot', text: data.response }]);
    } catch (error) {
      setIsLoading(false);
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Sorry, I encountered an error. Please try again.' }]);
    }
    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="header-content">
          <div className="logo-container">
            <div className="rotating-logo">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20C28 24.4183 24.4183 28 20 28" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="20" cy="20" r="4" fill="white"/>
              </svg>
            </div>
          </div>
          <div className="header-text">
            <h1>GNDEC InfoHive</h1>
            <p>Your AI Assistant for GNDEC Information</p>
            {user && (
              <div className="user-info">
                <span>Welcome, {user.username}!</span>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <p>👋 Welcome! Ask me anything about GNDEC College.</p>
            <p>Try asking about:</p>
            <ul>
              <li>📍 College location and facilities</li>
              <li>📚 Courses and admission process</li>
              <li>👨‍🏫 Faculty and departments</li>
              <li>📞 Contact information</li>
            </ul>
          </div>
        )}
        
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.from === 'user' ? 'user-message' : 'bot-message'}`}>
            <div className="message-content">
              <div className="message-sender">
                {msg.from === 'user' ? '👤 You' : '🤖 InfoHive'}
              </div>
              <div className="message-text" dangerouslySetInnerHTML={{ __html: msg.text }} />
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot-message">
            <div className="message-content">
              <div className="message-sender">🤖 InfoHive</div>
              <div className="message-text">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={sendMessage} className="chat-input-form">
        <div className="input-container">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="chat-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="send-button"
            disabled={isLoading}
          >
            {isLoading ? '⏳' : '📤'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat; 
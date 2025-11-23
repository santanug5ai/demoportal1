import React, { useState, useEffect, useRef } from 'react';
import ruleBasedChatService from '../services/ruleBasedChatService';
import './FloatingChatBot.css';

const FloatingChatBot = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Set navigation callback
    ruleBasedChatService.setNavigationCallback(onNavigate);

    // Welcome message
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: 'Hi! 👋 I\'m your navigation assistant.\n\nI can help you quickly navigate to:\n📊 Dashboard\n📂 Portfolio\n🛒 Buy Requests\n🤝 Engagements\n🚀 Innovation\n\nWhere would you like to go?',
        timestamp: new Date()
      }
    ]);
  }, [onNavigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    const textToSend = inputValue.trim();
    if (!textToSend) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await ruleBasedChatService.processMessage(textToSend);

      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          text: response.text,
          action: response.action,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 500);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleBot = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleQuickAction = (action) => {
    setInputValue(action);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button className="floating-chat-button" onClick={toggleBot} title="Open Chat Assistant">
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`floating-chat-window ${isMinimized ? 'minimized' : ''}`}>
          <div className="floating-chat-header">
            <div className="header-left">
              <span className="bot-icon">🤖</span>
              <div className="header-info">
                <h3>Navigation Assistant</h3>
                <span className="status-indicator">● Online</span>
              </div>
            </div>
            <div className="header-actions">
              <button
                className="header-btn minimize-btn"
                onClick={toggleMinimize}
                title={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? '□' : '_'}
              </button>
              <button className="header-btn close-btn" onClick={toggleBot} title="Close">
                ×
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="quick-nav-buttons">
                <button className="quick-nav-btn" onClick={() => handleQuickAction('Show dashboard')}>
                  📊 Dashboard
                </button>
                <button className="quick-nav-btn" onClick={() => handleQuickAction('Show portfolio')}>
                  📂 Portfolio
                </button>
                <button className="quick-nav-btn" onClick={() => handleQuickAction('Show orders')}>
                  🛒 Orders
                </button>
                <button className="quick-nav-btn" onClick={() => handleQuickAction('Show engagements')}>
                  🤝 Engagements
                </button>
              </div>

              <div className="floating-messages-container">
                {messages.map((message) => (
                  <div key={message.id} className={`floating-message ${message.type}`}>
                    <div className="message-content">
                      <div className="message-text">{message.text}</div>
                      <div className="message-time">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="floating-message bot">
                    <div className="message-content">
                      <div className="typing-indicator-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="floating-chat-input-container">
                <input
                  ref={inputRef}
                  type="text"
                  className="floating-chat-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                />
                <button
                  className="floating-send-button"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                >
                  ➤
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingChatBot;

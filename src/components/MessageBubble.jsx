import React from 'react';
import DataCard from './DataCard';
import './MessageBubble.css';

const MessageBubble = ({ message, onSuggestionClick }) => {
  const formatTimestamp = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`message-bubble-container ${message.type}`}>
      {message.type === 'bot' && (
        <div className="message-avatar bot-avatar">🤖</div>
      )}

      <div className="message-content-wrapper">
        <div className={`message-bubble ${message.type}`}>
          <div className="message-text">{message.text}</div>
          <div className="message-timestamp">{formatTimestamp(message.timestamp)}</div>
        </div>

        {message.responseType === 'cards' && message.data && message.data.length > 0 && (
          <div className="data-cards-container">
            {message.data.map((item, index) => (
              <DataCard key={index} data={item} type={message.responseType} />
            ))}
          </div>
        )}

        {message.suggestions && message.suggestions.length > 0 && (
          <div className="suggestions-container">
            {message.suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="suggestion-chip"
                onClick={() => onSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {message.type === 'user' && (
        <div className="message-avatar user-avatar">U</div>
      )}
    </div>
  );
};

export default MessageBubble;

import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-tcs">TCS</span>
          <span className="logo-text">Digital Portal</span>
        </div>
        <div className="header-subtitle">Conversational Interface</div>
      </div>
      <div className="header-right">
        <div className="header-info">
          <span className="status-indicator"></span>
          <span>Online</span>
        </div>
        <div className="user-profile">
          <div className="user-avatar">U</div>
          <span className="user-name">User</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

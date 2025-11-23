import React from 'react';
import './Footer.css';

const Footer = ({ onNavigate }) => {
  const handleNavigation = (view) => {
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>TCS Digital Portal</h3>
          <p>Conversational AI-powered digital workflow for BUY service requests</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <button onClick={() => handleNavigation('dashboard')} className="footer-link-btn">
                📊 Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('portfolio')} className="footer-link-btn">
                📂 Portfolio & Solutions
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('buy-requests')} className="footer-link-btn">
                🛒 Buy Requests
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('engagements')} className="footer-link-btn">
                🤝 Engagements
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('incubation')} className="footer-link-btn">
                🚀 Innovation Projects
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-section contact-section">
          <h4>Contact Us</h4>
          <div className="contact-box">
            <p className="contact-info">
              Email: <a href="mailto:digital.portal@tcs.com">digital.portal@tcs.com</a>
            </p>
            <p className="contact-info">
              Website: <a href="https://www.tcs.com" target="_blank" rel="noopener noreferrer">www.tcs.com</a>
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Tata Consultancy Services Limited. All rights reserved.</p>
        <p className="footer-tagline">Building on Belief™</p>
      </div>
    </footer>
  );
};

export default Footer;

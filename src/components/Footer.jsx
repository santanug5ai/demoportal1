import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>TCS Digital Portal</h3>
          <p>Conversational AI-powered digital workflow for BUY service requests</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Portfolio & Solutions</li>
            <li>Skills & Expertise</li>
            <li>Certifications</li>
            <li>Innovation Projects</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>TCS CMI</h4>
          <p>Powered by TCS Cognitive Market Insights</p>
          <p className="cmi-description">
            Leveraging AI, ML, and advanced analytics for intelligent business solutions
          </p>
        </div>

        <div className="footer-section contact-section">
          <h4>Need More Information?</h4>
          <div className="contact-box">
            <p className="contact-message">
              📞 <strong>Contact TCS Representative for more details</strong>
            </p>
            <p className="contact-info">
              Email: <a href="mailto:digital.portal@tcs.com">digital.portal@tcs.com</a>
            </p>
            <p className="contact-info">
              Phone: +1-XXX-XXX-XXXX
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

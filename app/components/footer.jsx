import React from "react";
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 id="header_h3">Contact</h3>
            <ul className="contact-list">
              <li>Email: email</li>
              <li>Phone: 123-456-7890</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Trades.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
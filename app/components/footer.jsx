import React from "react";
import '../styles/footer.css';
import Image from "next/image";

function Footer() {
  return (
    <footer className="footer">
      <div className="container1">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-flex">
                <div className="logo-title2">
                  <div className="logo-title1">
                  
                    <Image src="/images/iconBull.png" alt="Logo" width={42.30} height={42} />
                    <p id="web-title">Trades.com</p>
                  
                  </div>


                  <div className="cust">     
                  
                  <div className="customer">
                        <ul className="contact-list">
                          <p><b>Community</b></p>
                          <li>Blog</li>
                        </ul>
                      </div>               
                    <div className="customer">
                        <ul className="contact-list">
                          <p><b>Customer Service</b></p>
                          <li>Chatbot</li>
                          <li>Help Center</li>
                        </ul>
                      </div>


                    <ul className="contact-list">
                      <p><b>Contact</b></p>
                      <li>93A Avenue General de Gaulle, Saint-Louis, France</li>
                      <li>Email: trades@gmail.com</li>
                      <li>Phone: 123-456-7890</li>
                    </ul>
                  </div>
                </div>
              {/* <h3 id="header_h3">Contact</h3> */}
            </div>

            <div className="trade">
              <p>&copy; 2024 Trades.com. All rights reserved.</p>
            </div>
          </div>
        </div>

      </div>

    </footer>
  );
}

export default Footer;
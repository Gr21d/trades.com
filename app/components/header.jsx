import React from "react";
import '../styles/header.css'
import Image from "next/image";
function Header(props) {
  return (
    <div className="header-header-container">
    <div className="container-container">
        <div className="header-content">
        <div className="logo">
            <a href="#">
              <div className="logo-title-title">
                <Image src="/images/iconBull.png" alt="Logo" width={97} height={92} />
                <p id="web-title">Trades.com</p>
              </div>

            </a>
        </div>
        <nav className="navigation">
            <ul>
              {props.type !== "portfolio" &&<li><a href="./portfolio">Portfolio</a></li>}
              {props.type !== "dashboard" && <li><a href="./dashboard">Dashboard</a></li>}
              {props.type !== "blog" && <li><a href="./blog">Community</a></li>}
              {props.type !== "tutorial" && <li><a href="./tutorial">Learn</a></li>}
            </ul>
        </nav>
        </div>
    </div>
    </div>
  );
}
export default Header;
















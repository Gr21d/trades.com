import React from "react";
import '../styles/header.css'
import Image from "next/image";
function Header(props) {
  return (
    <header className="header">
    <div className="container">
        <div className="header-content">
        <div className="logo">
            <a href="#">
              <div className="logo-title">
                <Image src="/images/iconBull.png" alt="Logo" width={97} height={92} />
                <h1>Trades.com</h1>
              </div>

            </a>
        </div>
        <nav className="navigation">
            <ul>
              {props.type !== "Cryptocurrencies" && <li><a href="./blog">Cryptocurrencies</a></li>}
              {props.type !== "portfolio" &&<li><a href="./portfolio">Portfolio</a></li>}
              {props.type !== "dashboard" && <li><a href="./dashboard">Dashboard</a></li>}
              {props.type !== "blog" && <li><a href="./blog">Community</a></li>}
              {props.type !== "tutorial" && <li><a href="./tutorial">Learn</a></li>}
            </ul>
        </nav>
        </div>
    </div>
    </header>
  );
}
export default Header;
















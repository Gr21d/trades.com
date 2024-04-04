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
            <Image src="/images/iconBull.png" alt="Logo" width={97} height={92} />
            </a>
        </div>
        <nav className="navigation">
            <ul>
              {props.type !== "blog" && <li><a href="./blog">Blog</a></li>}
              {props.type !== "tutorial" && <li><a href="./tutorial">Tutorial</a></li>}
              {props.type !== "portfolio" &&<li><a href="./portfolio">Portfolio</a></li>}
              {props.type !== "dashboard" && <li><a href="./dashboard">DashBoard</a></li>}
              {props.type !== "customerSupport" &&<li><a href="./Customer Support">Customer Support</a></li>}
            </ul>
        </nav>
        </div>
    </div>
    </header>
  );
}
export default Header;
















import React from "react";
import '../styles/header.css';
import Image from "next/image";
import Link from 'next/link';
import ChatbotButtonWrapper from './ChatbotButtonWrapper.jsx';

function Header(props) {
  const { config, actionProvider, messageParser, saveMessages } = props;
  return (
    <div className="header-header-container">
      <div className="container-container">
        <div className="header-content">
          <div className="logo">
            <Link href="/">
              <div className="logo-title-title">
                <Image src="/images/iconBull.png" alt="Logo" width={97} height={92} />
                <p id="web-title">Trades.com</p>
              </div>
            </Link>
          </div>
          <nav className="navigation">
            <ul>
              {props.type !== "chatbot" && (
                <li>
                  <ChatbotButtonWrapper
                    config={config}
                    actionProvider={actionProvider}
                    messageParser={messageParser}
                    saveMessages={saveMessages}
                  />
                </li>
              )}
              {props.type !== "portfolio" && (
                <li>
                  <Link href="/wallet">Portfolio</Link>
                </li>
              )}
              {props.type !== "dashboard" && (
                <li>
                  <Link href="/dashboard/crypto/bitcoin">Dashboard</Link>
                </li>
              )}
              {props.type !== "blog" && (
                <li>
                  <Link href="/blog">Community</Link>
                </li>
              )}
              {props.type !== "tutorial" && (
                <li>
                  <Link href="/tutorial">Learn</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
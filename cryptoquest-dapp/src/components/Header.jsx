import React from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/CQTSOG-Logo.png';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logoUrl} alt="CryptoQuest Logo" style={{ height: '40px', marginRight: '10px' }} />
          CryptoQuest
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/features">Features</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/game-overview">Game Overview</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ps5-development">PS5 Development</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/xbox-development">Xbox Development</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/unity">Unity</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/unreal-engine-5">Unreal Engine 5</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cqt-token">CQT Token</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/buy-token">Buy Token</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/airdrop">Airdrop</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/join-development">Join Development</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/investor-perks">Investor Perks</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/community-forum">Community Forum</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/book-nft">Book NFT</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/connect">Connect</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/newsletter">Newsletter</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/white-paper">White Paper</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/merchandise">Merchandise</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chatbot">Chatbot</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary" id="connect-wallet">Connect Wallet</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
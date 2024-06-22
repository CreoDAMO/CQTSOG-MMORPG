import React from 'react';

const logoUrl = 'https://cf-ipfs.com/ipfs/bafybeicoyjrvm4nnhm4zsbtv5kyhlbi4coiwxboikc7jvsucunlzngrxem';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={logoUrl} alt="CryptoQuest Logo" style={{ height: '40px', marginRight: '10px' }} />
          CryptoQuest
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {/* Navigation links */}
            <li className="nav-item">
              <a className="nav-link" href="#features">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#game-overview">Game Overview</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#ps5-development">PS5 Development</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#xbox-development">Xbox Development</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#unity">Unity</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#unreal-engine-5">Unreal Engine 5</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#cqt-token">CQT Token</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#buy-token">Buy Token</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#airdrop">Airdrop</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#join-development">Join Development</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#investor-perks">Investor Perks</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#community-forum">Community Forum</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#book-nft">Book NFT</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#connect">Connect</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#newsletter">Newsletter</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#white-paper">White Paper</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#merchandise">Merchandise</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#chatbot">Chatbot</a>
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


// src/components/Home.jsx
import React from 'react';

const Home = () => (
  <header className="bg-dark text-light py-5">
    <div className="container text-center">
      <div className="row">
        <div className="col-md-6">
          <img src="/assets/CQTSOG-Logo.png" className="img-fluid animated" alt="Game Image" />
        </div>
        <div className="col-md-6">
          <img src="/assets/CQTSOG-Logo-for-'CQT-CryptoQuest-The-Shards-Of-Genesis-Token'-by-combining-elements-from-the-provided-images.-The-logo-should-feature-a-striking-geo.png" className="img-fluid animated" alt="Book Image" />
        </div>
      </div>
      <h1 className="display-4 animated">CryptoQuest: The Shards of Genesis</h1>
      <p className="lead animated">Embark on an epic journey through the realm of Cryptonia, a blockchain-based MMORPG where reality and digital existence converge.</p>
      <a href="#" className="btn btn-primary btn-lg mt-3 animated">Join the Adventure</a>
    </div>
  </header>
);

export default Home;

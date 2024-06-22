import React from 'react';

const Features = () => (
  <section id="features" className="py-5">
    <div className="container">
      <h2 className="text-center mb-4 animated">Key Features</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100 animated">
            <div className="card-body">
              <h5 className="card-title"><i className="fas fa-key"></i> True Ownership</h5>
              <p className="card-text">Own your in-game assets with unique NFTs, ensuring true ownership and value.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 animated">
            <div className="card-body">
              <h5 className="card-title"><i className="fas fa-coins"></i> Decentralized Economy</h5>
              <p className="card-text">Trade and interact with a thriving marketplace powered by blockchain technology.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 animated">
            <div className="card-body">
              <h5 className="card-title"><i className="fas fa-users"></i> Player Governance</h5>
              <p className="card-text">Shape the world of Cryptonia through player-elected councils, influencing its future.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Features;

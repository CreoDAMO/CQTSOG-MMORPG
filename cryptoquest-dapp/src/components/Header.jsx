// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <Link className="navbar-brand" to="/">CryptoQuest</Link>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item"><Link className="nav-link" to="/features">Features</Link></li>
        {/* Add other nav items */}
      </ul>
    </div>
  </nav>
);

export default Header;

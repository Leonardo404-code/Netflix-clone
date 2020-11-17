import React from 'react';

import './Header.css';

import logo from '../../images/netflix-logo-2-1.png';

import userImage from '../../images/user-netflix.png';

// eslint-disable-next-line
export default ({black}) => {
  return (
    <header className={black ? 'black' : ''}>
      {' '}
      {/* Se black for verdadeiro utiliza o black do código do app.js se não for utiliza o css de Header */}
      <div className="header--logo">
        <a href="/">
          <img src={logo} alt="Logo da Netflix" />
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img src={userImage} alt="Usuário" />
        </a>
      </div>
    </header>
  );
};

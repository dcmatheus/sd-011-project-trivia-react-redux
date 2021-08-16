import React from 'react';
import { useSelector } from 'react-redux';
import '../style/header.css';

function Header() {
  const { username, avatar, score } = useSelector((state) => state.user);
  return (
    <header>
      <div className="header-container">
        <div className="header-user-container">
          <img
            className="header-avatar"
            src={ avatar }
            alt="avatar"
            data-testid="header-profile-picture"
          />
          <h2 data-testid="header-player-name">
            Jogador(a):
            {' '}
            <span style={ { fontWeight: 'normal' } }>{ username }</span>
          </h2>
        </div>
        <h2>
          Pontos:
          <span
            data-testid="header-score"
            style={ { fontWeight: 'normal' } }
          >
            {' '}
            { score }
          </span>
        </h2>
      </div>
    </header>
  );
}

export default Header;

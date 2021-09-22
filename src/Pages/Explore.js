import React from 'react';
import profileIcon from '../images/profileIcon.svg';

function Explore() {
  return (
    <div>
      <h1 data-testid="page-title">Explorar</h1>
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Para a tela de perfil"
      />
    </div>
  );
}

export default Explore;

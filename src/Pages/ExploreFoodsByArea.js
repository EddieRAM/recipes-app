import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function ExploreFoodsByArea() {
  return (
    <div>
      <h1 data-testid="page-title">Explorar Comidas por Localidade</h1>
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="Para a tela de perfil"
      />
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Para a tela de perfil"
      />
    </div>
  );
}

export default ExploreFoodsByArea;

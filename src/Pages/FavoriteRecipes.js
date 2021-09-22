import React from 'react';
import profileIcon from '../images/profileIcon.svg';

function FavoriteRecipes() {
  return (
    <header>
      <h1 data-testid="page-title">Receitas Favoritas</h1>
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Para a tela de perfil"
      />
    </header>
  );
}

export default FavoriteRecipes;

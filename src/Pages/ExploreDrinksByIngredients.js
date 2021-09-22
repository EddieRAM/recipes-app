import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../Components/Footer';

function ExploreDrinksByIngredients() {
  return (
    <div>
      <h1 data-testid="page-title">Explorar Ingredientes</h1>
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Para a tela de perfil"
      />
      <Footer />
    </div>
  );
}

export default ExploreDrinksByIngredients;

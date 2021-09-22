import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';

export default function ExploreDrinks({ history }) {
  return (
    <div>
      <h1 data-testid="page-title">Explorar Bebidas</h1>
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Para a tela de perfil"
      />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push('/bebidas/178319') }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

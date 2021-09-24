import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../Components/Footer';

export default function Explore({ history }) {
  return (

    <div>
      <div>
        <h1 data-testid="page-title">Explorar</h1>
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Para a tela de perfil"
        />
      </div>
      <button
        type="button"
        data-testid="explore-food"
        onClick={ () => history.push('/explorar/comidas') }
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('/explorar/bebidas') }
      >
        Explorar Bebidas
      </button>
      <Footer />
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

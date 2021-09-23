import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../Components/Footer';
import ProfileAvatar from '../Components/ProfileAvatar';

export default function ExploreDrinks({ history }) {
  return (
    <div>
      <h1 data-testid="page-title">Explorar Bebidas</h1>
      <ProfileAvatar />
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
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

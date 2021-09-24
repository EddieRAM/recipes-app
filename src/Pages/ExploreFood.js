import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../Components/Footer';
import ProfileAvatar from '../Components/ProfileAvatar';

export default function ExploreFood({ history }) {
  return (
    <div>
      <h1 data-testid="page-title">Explorar Comidas</h1>
      <ProfileAvatar />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push('/comidas/52771') }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

ExploreFood.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

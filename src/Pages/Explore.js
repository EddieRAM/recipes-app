import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../Components/Footer';
import ProfileAvatar from '../Components/ProfileAvatar';

export default function Explore({ history }) {
  return (

    <div>
      <div>
        <h1 data-testid="page-title">Explorar</h1>
        <ProfileAvatar />
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

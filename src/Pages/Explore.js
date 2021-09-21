import React from 'react';
import PropTypes from 'prop-types';

export default function Explore({ history }) {
  return (
    <div>
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
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

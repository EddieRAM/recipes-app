import React from 'react';
import PropTypes from 'prop-types';

function ProgressDrink({ match: { params: { id } } }) {
  console.log(id);
  return (
    <p>oi</p>
  );
}

ProgressDrink.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.object,
  ).isRequired,
};

export default ProgressDrink;

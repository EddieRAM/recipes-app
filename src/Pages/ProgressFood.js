import React from 'react';
import PropTypes from 'prop-types';

function ProgressFood({ match: { params: { id } } }) {
  console.log(id);
  return (
    <p>Oi</p>
  );
}

ProgressFood.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.object,
  ).isRequired,
};

export default ProgressFood;

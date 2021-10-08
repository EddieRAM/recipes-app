import React from 'react';
import PropTypes from 'react-dom';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

import '../Styles/HeaderElements.css';

function HeaderElements() {
  const history = useHistory();

  return (
    <div className="header">
      <button
        className="header-button"
        data-testid="profile-top-btn"
        type="button"
        onClick={ () => history.push('/perfil') }
        src={ profileIcon }
      >
        <img src={ profileIcon } alt="Perfil" />
      </button>
      <span className="header-span" data-testid="page-title">
        Header
      </span>
    </div>
  );
}

HeaderElements.propTypes = {
  toggleSearchBar: PropTypes.object,
}.isRequired;

export default HeaderElements;

import React from 'react';
import PropTypes from 'react-dom';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../Styles/Header.css';

function Header() {
  const history = useHistory();

  return (
    <div className="header">
      <button
        data-testid="profile-top-btn"
        type="button"
        onClick={ () => history.push('/perfil') }
        src={ profileIcon }
      >
        <img src={ profileIcon } alt="Perfil" />
      </button>
      <span data-testid="page-title">
        Header
      </span>
      <button
        data-testid="search-top-btn"
        type="button"
        src={ searchIcon }
      >
        <img src={ searchIcon } alt="Mostrar pesquisa" />
      </button>
    </div>
  );
}

Header.propTypes = {
  toggleSearchBar: PropTypes.object,
}.isRequired;

export default Header;

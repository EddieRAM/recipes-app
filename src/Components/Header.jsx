import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../Styles/Header.css';
import SearchBar from './SearchBar';
import Context from '../Context/Context';

function Header() {
  const history = useHistory();
  const { setDataFilter, showSearch, setShowSearch } = useContext(Context);

  function alterar() {
    if (showSearch === false) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
      setDataFilter([]);
    }
  }

  return (
    <div>
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
          Perfil / Busca
        </span>
        <button
          data-testid="search-top-btn"
          type="button"
          src={ searchIcon }
          onClick={ () => { alterar(); } }
        >
          <img src={ searchIcon } alt="Mostrar pesquisa" />
        </button>
      </div>
      { showSearch === true ? <SearchBar /> : null }
    </div>
  );
}

// Header.propTypes = {
//   toggleSearchBar: PropTypes.object,
// }.isRequired;

export default Header;

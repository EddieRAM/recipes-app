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

  function name() {
    const nameHistory = history.location.pathname;
    switch (nameHistory) {
    case '/explorar/comidas/area':
      return 'Explorar Origem';
    case '/explorar/comidas':
      return 'Explorar Comidas';
    case '/explorar/bebidas':
      return 'Explorar Bebidas';
    case '/explorar/comidas/ingredientes':
      return 'Explorar Ingredientes';
    case '/explorar/bebidas/ingredientes':
      return 'Explorar Ingredientes';
    case '/receitas-feitas':
      return 'Receitas Feitas';
    case '/receitas-favoritas':
      return 'Receitas Favoritas';
    case '/comidas':
      return 'Comidas';
    case '/bebidas':
      return 'Bebidas';
    case '/explorar':
      return 'Explorar';
    case '/perfil':
      return 'Perfil';
    default:
    }
  }

  function bottunMag() {
    const nameHisotry = history.location.pathname;
    if (nameHisotry === '/comidas' || nameHisotry === '/bebidas'
      || nameHisotry === '/explorar/comidas/area') {
      return (
        <div>
          <button
            data-testid="search-top-btn"
            type="button"
            src={ searchIcon }
            onClick={ () => { alterar(); } }
          >
            <img src={ searchIcon } alt="Mostrar pesquisa" />
          </button>
        </div>
      );
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
          { name() }
        </span>
        { bottunMag() }
      </div>
      { showSearch === true ? <SearchBar /> : null }
    </div>
  );
}

// Header.propTypes = {
//   toggleSearchBar: PropTypes.object,
// }.isRequired;

export default Header;

import React, { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';
import HeaderElements from './HeaderElements';
import SearchBar from './SearchBar';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <header>
      <HeaderElements />
      { showSearch ? <SearchBar /> : null }
      <button
        onClick={ () => setShowSearch(!showSearch) }
        type="button"
      >
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="Abre a barra de pesquisa"
        />
      </button>
    </header>
  );
}

export default Header;

import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as ReactBootstrap from 'react-bootstrap';
import Context from '../Context/Context';
import '../Styles/SearchBar.css';

function SearchBar() {
  const { radioBtn, setSearch, setRadioBtn, handleClick, usrQuery } = useContext(Context);

  const history = useHistory();
  const { location: { pathname } } = history;

  const searchFilter = ({ value }) => {
    setSearch(value);
    if (radioBtn === 'first-letter' && usrQuery.length > 0) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  return (
    <form
      onSubmit={ (e) => e.preventDefault() }
      className="searchbar form"
    >
      <label htmlFor="search-input">
        <input
          className="text-input"
          data-testid="search-input"
          id="search-input"
          type="text"
          onChange={ ({ target }) => searchFilter(target) }
          placeholder="Busque uma receita"
        />
        <span className="text-input-border" />
      </label>
      <div className="radio-btns">
        <label htmlFor="name">
          <input
            id="name-radio"
            data-testid="name-search-radio"
            type="radio"
            value="name"
            onChange={ ({ target: { value } }) => setRadioBtn(value) }
          />
          Nome
        </label>
        <label htmlFor="ingredients">
          <input
            data-testid="ingredient-search-radio"
            id="ingredients"
            type="radio"
            value="ingredients"
            onChange={ ({ target: { value } }) => setRadioBtn(value) }
          />
          Ingredientes
        </label>
        <label htmlFor="first-letter">
          <input
            id="first-letter-radio"
            data-testid="first-letter-search-radio"
            type="radio"
            value="first-letter"
            onChange={ ({ target: { value } }) => setRadioBtn(value) }
          />
          Primeira Letra
        </label>
        <ReactBootstrap.Button
          className="searchbar-btn"
          data-testid="exec-search-btn"
          type="button"
          onClick={ () => { handleClick(pathname); } }
        >
          Pesquisar
        </ReactBootstrap.Button>

      </div>
    </form>
  );
}

export default SearchBar;

import React, { useContext } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

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
    <section className="searchbar">
      <form>
        <label htmlFor="search-input">
          <input
            className="text-input"
            data-testid="search-input"
            id="search-input"
            type="text"
            onChange={ ({ target }) => searchFilter(target) }
          />
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
        </div>
        <section>
          <ReactBootstrap.Button
            className="searchbar-btn"
            data-testid="exec-search-btn"
            type="button"
            onClick={ () => { handleClick(pathname); } }
          >
            Pesquisar
          </ReactBootstrap.Button>

        </section>

      </form>
    </section>
  );
}

export default SearchBar;

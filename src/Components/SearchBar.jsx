import React, { useContext } from 'react';
import Context from '../Context/Context';

function SearchBar() {
  const { radioBtn, setSearch, setRadioBtn, handleClick, usrQuery } = useContext(Context);

  const searchFilter = ({ value }) => {
    setSearch(value);
    if (radioBtn === 'first-letter' && usrQuery.length > 0) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };
  return (
    <div>
      <label htmlFor="search-input">
        <input
          data-testid="search-input"
          id="search-input"
          type="text"
          onChange={ ({ target }) => searchFilter(target) }
        />
      </label>
      <form>
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
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ handleClick }
        >
          Pesquisar
        </button>

      </form>
    </div>
  );
}

export default SearchBar;

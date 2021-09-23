import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="search-input">
        <input
          data-testid="search-input"
          id="search-input"
          type="text"
          placeholder="Busque sua receita"
        />
      </label>
      <form>
        <label htmlFor="name">
          Nome
          <input
            data-testid="name-search-radio"
            name="category"
            id="name"
            type="radio"
          />
        </label>
        <label htmlFor="ingredients">
          Ingredientes
          <input
            data-testid="ingredient-search-radio"
            name="category"
            id="ingredients"
            type="radio"
          />
        </label>
        <label htmlFor="first-letter">
          Primeira Letra
          <input
            data-testid="first-letter-search-radio"
            name="category"
            id="first-letter"
            type="radio"
          />
        </label>
        <button type="button" data-testid="exec-search-btn">Pesquisar</button>
      </form>
    </div>
  );
}

export default SearchBar;

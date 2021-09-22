import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="search-input">
        <input
          id="search-input"
          data-testid="search-input"
          type="text"
          placeholder="Busque sua receita"
        />
      </label>
    </div>
  );
}

export default SearchBar;

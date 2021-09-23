import React, { useEffect, useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favorite, setFavorite] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      setFavorite(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);
  return (
    <div>
      <header>
        <h1 data-testid="page-title">Receitas Favoritas</h1>
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Para a tela de perfil"
        />
      </header>
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">All</button>
        <button type="button" data-testid="filter-by-drink-btn">All</button>
      </div>
      <main>
        {
          favorite.map((item, index) => {
            if (item.type === 'comida') {
              return (
                <div key={ item.id }>
                  <img
                    src={ item.image }
                    alt={ item.name }
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${item.area} - ${item.category}` }
                  </p>
                  <p data-testid={ `${index}-horizontal-name` }>{ item.name }</p>
                  {/* <p data-testid={ `${index}-horizontal-done-date` }>{}</p> */}
                  <img
                    src={ shareIcon }
                    alt="Share Icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                  <img
                    src={ blackHeartIcon }
                    alt=""
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </div>
              );
            } return (
              <div key={ item.id }>
                <img
                  src={ item.image }
                  alt={ item.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {item.alcoholicOrNot}
                </p>
                <p data-testid={ `${index}-horizontal-name` }>{ item.name }</p>
                <img
                  src={ shareIcon }
                  alt="Share Icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
                <img
                  src={ blackHeartIcon }
                  alt=""
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </div>
            );
          })
        }
      </main>
    </div>
  );
}

export default FavoriteRecipes;

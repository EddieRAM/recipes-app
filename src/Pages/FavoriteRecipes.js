import React, { useEffect, useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favorite, setFavorite] = useState([
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ]);
  const [message, setMessage] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      setFavorite(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);
  // function handleClick({ currentTarget }) {
  //   navigator.clipboard.writeText(`http://localhost:3000/comidas/${currentTarget}`);
  //   console.log(currentTarget.parentNode.key);
  //   alert('Link copiado!'); // eslint-disable-line no-alert
  // }
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
        <button type="button" data-testid="filter-by-food-btn">Foods</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
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
                  <button
                    type="button"
                    onClick={ () => {
                      navigator.clipboard.writeText(`http://localhost:3000/comidas/${item.id}`);
                      setMessage(true);
                    } }
                  >
                    <img
                      src={ shareIcon }
                      alt="Share Icon"
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                  </button>
                  <button type="button">
                    <img
                      src={ blackHeartIcon }
                      alt=""
                      data-testid={ `${index}-horizontal-favorite-btn` }
                    />
                  </button>
                  { message && <p>Link copiado!</p>}
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
                <button
                  type="button"
                  onClick={ () => {
                    navigator.clipboard.writeText(`http://localhost:3000/comidas/${item.id}`);
                  } }
                >
                  <img
                    src={ shareIcon }
                    alt="Share Icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                <button type="button">
                  <img
                    src={ blackHeartIcon }
                    alt=""
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
              </div>
            );
          })
        }
      </main>
    </div>
  );
}

export default FavoriteRecipes;

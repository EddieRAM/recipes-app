import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes({ history }) {
  const [favorite, setFavorite] = useState([]);
  const [message, setMessage] = useState(false);
  const [food, setFood] = useState(false);
  const [drink, setDrink] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      setFavorite(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
  }, [favorite]);

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
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => { setFood(false); setDrink(false); } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => { setFood(true); setDrink(false); } }
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => { setFood(false); setDrink(true); } }
        >
          Drinks
        </button>
      </div>
      <main>
        {
          favorite.filter(({ type }) => {
            if (food === true) return type === 'comida';
            if (drink === true) return type === 'bebida';
            return favorite;
          }).map((item, index) => {
            if (item.type === 'comida') {
              return (
                <div key={ item.id }>
                  <img
                    src={ item.image }
                    alt={ item.name }
                    data-testid={ `${index}-horizontal-image` }
                    role="presentation"
                    onClick={ () => history.push(`/comidas/${item.id}`) }
                    width="75%"
                  />
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${item.area} - ${item.category}` }
                  </p>
                  <p
                    data-testid={ `${index}-horizontal-name` }
                    role="presentation"
                    onClick={ () => history.push(`/comidas/${item.id}`) }
                  >
                    { item.name }
                  </p>
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
                  <button
                    type="button"
                    onClick={ () => {
                      setFavorite((prevState) => (
                        prevState.filter(({ name }) => name !== item.name)));
                    } }
                  >
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
                  role="presentation"
                  onClick={ () => history.push(`/bebidas/${item.id}`) }
                  width="75%"
                />
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {item.alcoholicOrNot}
                </p>
                <p
                  data-testid={ `${index}-horizontal-name` }
                  role="presentation"
                  onClick={ () => history.push(`/bebidas/${item.id}`) }
                >
                  { item.name }
                </p>
                <button
                  type="button"
                  onClick={ () => {
                    navigator.clipboard.writeText(`http://localhost:3000/comidas/${item.id}`);
                    alert('Link copiado!'); // eslint-disable-line no-alert
                  } }
                >
                  <img
                    src={ shareIcon }
                    alt="Share Icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                <button
                  type="button"
                  onClick={ () => {
                    setFavorite((prevState) => (
                      prevState.filter(({ id }) => id !== item.id)));
                  } }
                >
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

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default FavoriteRecipes;

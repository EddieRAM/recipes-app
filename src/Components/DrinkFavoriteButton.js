import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function DrinkFavoriteButton({ drinkRecipe, id }) {
  const [favorite, setFavorite] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoritesList(fav);
    if (fav !== null) {
      fav.forEach((item) => {
        if (item.id === id) {
          setFavorite(true);
        }
      });
    }
  }, [id, favorite]);

  function favDrink() {
    const drink = {
      id: drinkRecipe.idDrink,
      area: '',
      type: 'bebida',
      category: drinkRecipe.strCategory,
      alcoholicOrNot: drinkRecipe.strAlcoholic,
      name: drinkRecipe.strDrink,
      image: drinkRecipe.strDrinkThumb,
    };
    return drink;
  }

  function handleFavorite() {
    if (favorite && favoritesList.length > 1) {
      setFavorite(false);
      const list = favoritesList.filter((item) => item.id !== id);
      setFavoritesList(list);
      localStorage.setItem('favoriteRecipes', JSON.stringify(list));
    } else if (favorite && favoritesList.length === 1) {
      setFavorite(false);
      localStorage.removeItem('favoriteRecipes');
    } else if (!favorite && localStorage.getItem('favoriteRecipes') === null) {
      setFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify([favDrink()]));
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('favoriteRecipes')),
          favDrink(),
        ]),
      );
      setFavorite(true);
    }
  }

  return (
    <div>
      <button onClick={ handleFavorite } type="button">
        <img
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          data-testid="favorite-btn"
          alt="fav"
        />
      </button>
    </div>
  );
}

DrinkFavoriteButton.propTypes = {
  drinkRecipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired,
};

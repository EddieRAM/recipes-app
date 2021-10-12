import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import '../Styles/RecipeDetails.css';

export default function MealFavoriteButton({ mealRecipe, id }) {
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

  function favMeal() {
    const meal = {
      id: mealRecipe.idMeal,
      area: mealRecipe.strArea,
      type: 'comida',
      category: mealRecipe.strCategory,
      alcoholicOrNot: '',
      name: mealRecipe.strMeal,
      image: mealRecipe.strMealThumb,
    };
    return meal;
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
      localStorage.setItem('favoriteRecipes', JSON.stringify([favMeal()]));
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('favoriteRecipes')),
          favMeal(),
        ]),
      );
      setFavorite(true);
    }
  }

  return (
    <div className="favorite-btn">
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

MealFavoriteButton.propTypes = {
  mealRecipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired,
};

/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import { MealsRecommendation, DrinkRecipeById } from '../API';
import Card from '../components/Card';
import DrinkIngredientsDetails from '../components/DrinkIngredientsDetails';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function DrinkRecipeDetails({ match: { params: { id } }, history }) {
  const [favorite, setFavorite] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);
  const [message, setMessage] = useState(false);
  const [drinkRecipe, setDrinkRecipe] = useState([]);
  const [mealsRecommendation, setMealsRecommendation] = useState([]);

  useEffect(() => {
    async function fetch() {
      const { drinks } = await DrinkRecipeById(id);
      setDrinkRecipe(drinks);
    }
    fetch();
  }, [id]);

  useEffect(() => {
    async function fetch() {
      const { meals } = await MealsRecommendation();
      setMealsRecommendation(meals);
    }
    fetch();
  }, []);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoritesList(fav);
    if (fav !== null) {
      fav.forEach((item) => {
        if (item.id === id) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      });
    }
  }, [id, favorite]);

  if (!drinkRecipe.length) {
    return <div>Loading...</div>;
  }

  function copyLink() {
    const copyTest = window.location.href;
    navigator.clipboard.writeText(copyTest);
    setMessage(true);
  }

  function handleFavorite() {
    if (favorite) {
      setFavorite(false);
      if (favoritesList.length > 1) {
        const list = favoritesList.filter((item) => item.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(list));
      }
      if (favoritesList.length === 1) {
        console.log('1');
        localStorage.removeItem('favoriteRecipes');
      }
    } else {
      const drink = {
        id: drinkRecipe[0].idDrink,
        area: '',
        type: 'bebida',
        category: drinkRecipe[0].strCategory,
        alcoholicOrNot: drinkRecipe[0].strAlcoholic,
        name: drinkRecipe[0].strDrink,
        image: drinkRecipe[0].strDrinkThumb,
      };
      if (localStorage.getItem('favoriteRecipes') === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([drink]));
      } else {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([
            ...JSON.parse(localStorage.getItem('favoriteRecipes')),
            drink,
          ]),
        );
      }
      setFavorite(true);
    }
  }

  return (
    <div>
      <img src={ `${drinkRecipe[0].strDrinkThumb}` } data-testid="recipe-photo" alt="recipe" />
      <h1 data-testid="recipe-title">{drinkRecipe[0].strDrink}</h1>
      <button onClick={ copyLink } type="button" data-testid="share-btn">Share</button>
      <p>{message ? 'Link copiado!' : ''}</p>
      <button onClick={ handleFavorite } type="button">
        <img src={ favorite ? blackHeartIcon : whiteHeartIcon } data-testid="favorite-btn" alt="fav" />
      </button>
      <h3 data-testid="recipe-category">{drinkRecipe[0].strAlcoholic}</h3>
      <DrinkIngredientsDetails ingredients={ drinkRecipe[0] } />
      <p data-testid="instructions">{drinkRecipe[0].strInstructions}</p>
      <div>
        <Card recommendation={ mealsRecommendation } />
      </div>
      <button onClick={ () => history.push(`/bebidas/${id}/in-progress`) } className="start-btn" type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}

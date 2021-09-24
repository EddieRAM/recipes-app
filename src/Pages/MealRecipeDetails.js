/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import { DrinksRecommendation, MealRecipeById } from '../API';
import Card from '../components/Card';
import MealIngredientsDetails from '../components/MealIngredientsDetails';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function MealRecipeDetails({ match: { params: { id } }, history }) {
  const [favorite, setFavorite] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);
  const [message, setMessage] = useState(false);
  const [mealRecipe, setMealRecipe] = useState([]);
  const [drinksRecommendation, setDrinksRecommendation] = useState([]);

  useEffect(() => {
    async function fetch() {
      const { meals } = await MealRecipeById(id);
      setMealRecipe(meals);
    }
    fetch();
  }, [id]);

  useEffect(() => {
    async function fetch() {
      const { drinks } = await DrinksRecommendation();
      setDrinksRecommendation(drinks);
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

  if (!mealRecipe.length) {
    return <div>Loading...</div>;
  }

  function video() {
    const link = mealRecipe[0].strYoutube;
    const result = link.replace('https://www.youtube.com/watch?v=', '');
    return result;
  }

  function copyLink() {
    const copyTest = window.location.href;
    navigator.clipboard.writeText(copyTest);
    setMessage(true);
  }

  function handleFavorite() {
    if (favorite === true) {
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
      const meal = {
        id: mealRecipe[0].idMeal,
        area: mealRecipe[0].strArea,
        type: 'comida',
        category: mealRecipe[0].strCategory,
        alcoholicOrNot: '',
        name: mealRecipe[0].strMeal,
        image: mealRecipe[0].strMealThumb,
      };
      if (localStorage.getItem('favoriteRecipes') === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([meal]));
      } else {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([
            ...JSON.parse(localStorage.getItem('favoriteRecipes')),
            meal,
          ]),
        );
      }
      setFavorite(true);
    }
  }

  return (
    <div>
      <img src={ `${mealRecipe[0].strMealThumb}` } data-testid="recipe-photo" alt="recipe" />
      <h1 data-testid="recipe-title">{mealRecipe[0].strMeal}</h1>
      <button onClick={ copyLink } type="button" data-testid="share-btn">Share</button>
      <p>{message ? 'Link copiado!' : ''}</p>
      <button onClick={ handleFavorite } type="button">
        <img src={ favorite ? blackHeartIcon : whiteHeartIcon } data-testid="favorite-btn" alt="fav" />
      </button>
      <h3 data-testid="recipe-category">{mealRecipe[0].strCategory}</h3>
      <MealIngredientsDetails ingredients={ mealRecipe[0] } />
      <p data-testid="instructions">{mealRecipe[0].strInstructions}</p>
      <embed src={ `https://www.youtube.com/embed/${video()}` } data-testid="video" width="425" height="344" />
      <div>
        <Card recommendation={ drinksRecommendation } />
      </div>
      <button onClick={ () => history.push(`/comidas/${id}/in-progress`) } className="start-btn" type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}

/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DrinksRecommendation, MealRecipeById } from '../API';
import DrinksCarousel from '../Components/DrinksCarousel';
import IngredientsDetails from '../Components/IngredientsDetails';
import MealFavoriteButton from '../Components/MealFavoriteButton';

export default function MealRecipeDetails({ match: { params: { id } }, history }) {
  const [message, setMessage] = useState(false);
  const [mealRecipe, setMealRecipe] = useState([]);
  const [drinksRecommendation, setDrinksRecommendation] = useState([]);
  const [progress, setProgress] = useState(true);

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
    const inProgressList = (JSON.parse(localStorage.getItem('inProgressRecipes')));
    if (inProgressList !== null) {
      Object.entries((inProgressList).meals).forEach((item) => {
        if (item[0] === id) {
          console.log(item);
          setProgress(false);
        }
      });
    }
  }, [id, progress]);

  function video() {
    const link = mealRecipe[0].strYoutube;
    const result = link.replace('https://www.youtube.com/watch?v=', '');
    return result;
  }

  if (!mealRecipe.length) {
    return <div>Loading...</div>;
  }

  function copyLink() {
    const copyTest = window.location.href;
    navigator.clipboard.writeText(copyTest);
    setMessage(true);
  }

  return (
    <div className="details-container">
      <img
        className="details-img"
        src={ `${mealRecipe[0].strMealThumb}` }
        data-testid="recipe-photo"
        alt="recipe"
      />
      <h1 data-testid="recipe-title">{mealRecipe[0].strMeal}</h1>
      <button
        className="share-btn"
        onClick={ copyLink }
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      <p>{message ? 'Link copiado!' : ''}</p>
      <MealFavoriteButton mealRecipe={ mealRecipe[0] } id={ id } />
      <h3 data-testid="recipe-category">{mealRecipe[0].strCategory}</h3>
      <IngredientsDetails ingredients={ mealRecipe[0] } />
      <p
        className="instructions"
        data-testid="instructions"
      >
        {mealRecipe[0].strInstructions}

      </p>
      <embed src={ `https://www.youtube.com/embed/${video()}` } data-testid="video" width="425" height="344" />
      <div className="carousel">
        <DrinksCarousel recommendation={ drinksRecommendation } />
      </div>
      <button
        onClick={ () => history.push(`/comidas/${id}/in-progress`) }
        className="start-btn"
        type="button"
        data-testid="start-recipe-btn"
      >
        {progress ? 'Iniciar Receita' : 'Continuar Receita'}
      </button>
    </div>
  );
}

MealRecipeDetails.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.objectOf({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

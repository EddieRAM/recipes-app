import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MealsRecommendation, DrinkRecipeById } from '../API';
import MealsCarousel from '../Components/MealsCarousel';
import IngredientsDetails from '../Components/IngredientsDetails';
import DrinkFavoriteButton from '../Components/DrinkFavoriteButton';

export default function DrinkRecipeDetails({ match: { params: { id } }, history }) {
  const [message, setMessage] = useState(false);
  const [drinkRecipe, setDrinkRecipe] = useState([]);
  const [mealsRecommendation, setMealsRecommendation] = useState([]);
  const [progress, setProgress] = useState(true);

  useEffect(() => {
    async function fetch() {
      const drinks = await DrinkRecipeById(id);
      const drink = drinks.drinks ? drinks.drinks : {};
      setDrinkRecipe(drink);
    }
    fetch();
  }, [id]);
  console.log(drinkRecipe);
  useEffect(() => {
    async function fetch() {
      const { meals } = await MealsRecommendation();
      setMealsRecommendation(meals);
    }
    fetch();
  }, []);

  useEffect(() => {
    const inProgressList = (JSON.parse(localStorage.getItem('inProgressRecipes')));
    if (inProgressList !== null) {
      Object.entries((inProgressList).cocktails).forEach((item) => {
        if (item[0] === id) {
          setProgress(false);
        }
      });
    }
  }, [id, progress]);

  if (!drinkRecipe.length) {
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
        src={ `${drinkRecipe[0].strDrinkThumb}` }
        data-testid="recipe-photo"
        alt="recipe"
      />
      <h1 data-testid="recipe-title">{drinkRecipe[0].strDrink}</h1>
      <button
        className="share-btn"
        onClick={ copyLink }
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      <p>{message ? 'Link copiado!' : ''}</p>
      <DrinkFavoriteButton drinkRecipe={ drinkRecipe[0] } id={ id } />
      <h3 data-testid="recipe-category">{drinkRecipe[0].strAlcoholic}</h3>
      <IngredientsDetails ingredients={ drinkRecipe[0] } />
      <p
        className="instructions"
        data-testid="instructions"
      >
        {drinkRecipe[0].strInstructions}

      </p>
      <div className="carousel">
        <MealsCarousel recommendation={ mealsRecommendation } />
      </div>
      <div />
      <button
        onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
        className="start-btn"
        type="button"
        data-testid="start-recipe-btn"
      >
        {progress ? 'Iniciar Receita' : 'Continuar Receita'}
      </button>
    </div>
  );
}

DrinkRecipeDetails.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.objectOf({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

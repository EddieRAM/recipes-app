import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MealsRecommendation, DrinkRecipeById } from '../API';
import MealsCarousel from '../Components/MealsCarousel';
import IngredientsDetails from '../Components/IngredientsDetails';
import DrinkFavoriteButton from '../Components/DrinkFavoriteButton';
// import { handleFavorite, ifFavoriteFalse } from '../DrinkRecipesDetailsFunctions';

export default function DrinkRecipeDetails({ match: { params: { id } }, history }) {
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

  if (!drinkRecipe.length) {
    return <div>Loading...</div>;
  }

  function copyLink() {
    const copyTest = window.location.href;
    navigator.clipboard.writeText(copyTest);
    setMessage(true);
  }

  return (
    <div>
      <img
        src={ `${drinkRecipe[0].strDrinkThumb}` }
        data-testid="recipe-photo"
        alt="recipe"
      />
      <h1 data-testid="recipe-title">{drinkRecipe[0].strDrink}</h1>
      <button onClick={ copyLink } type="button" data-testid="share-btn">Share</button>
      <p>{message ? 'Link copiado!' : ''}</p>
      <DrinkFavoriteButton drinkRecipe={ drinkRecipe[0] } id={ id } />
      <h3 data-testid="recipe-category">{drinkRecipe[0].strAlcoholic}</h3>
      <IngredientsDetails ingredients={ drinkRecipe[0] } />
      <p data-testid="instructions">{drinkRecipe[0].strInstructions}</p>
      <MealsCarousel recommendation={ mealsRecommendation } />
      <div />
      <button
        onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
        className="start-btn"
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
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

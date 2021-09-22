/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import { MealsRecommendation, DrinkRecipeById } from '../API';
import Card from '../components/Card';
import DrinkIngredientsDetails from '../components/DrinkIngredientsDetails';
// match: { params: {id}}}
export default function RecipeDetails() {
  const [drinkRecipe, setDrinkRecipe] = useState([]);
  const [mealsRecommendation, setMealsRecommendation] = useState([]);

  useEffect(() => {
    async function fetch() {
      const { drinks } = await DrinkRecipeById('11007');
      setDrinkRecipe(drinks);
    }
    fetch();
  }, []);

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
  console.log(Object.entries(drinkRecipe[0]));

  return (
    <div>
      <img src={ `${drinkRecipe[0].strDrinkThumb}` } data-testid="recipe-photo" alt="recipe" />
      <h1 data-testid="recipe-title">{drinkRecipe[0].strDrink}</h1>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <h3 data-testid="recipe-category">{drinkRecipe[0].strAlcoholic}</h3>
      <DrinkIngredientsDetails ingredients={ drinkRecipe[0] } />
      <p data-testid="instructions">{drinkRecipe[0].strInstructions}</p>
      <div>
        <Card recommendation={ mealsRecommendation } />
      </div>
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}

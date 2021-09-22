/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import { DrinksRecommendation, MealRecipeById } from '../API';
import Card from '../components/Card';
import MealIngredientsDetails from '../components/MealIngredientsDetails';

export default function RecipeDetails() {
  const [mealRecipe, setMealRecipe] = useState([]);
  const [drinksRecommendation, setDrinksRecommendation] = useState([]);

  useEffect(() => {
    async function fetch() {
      const { meals } = await MealRecipeById('52772');
      setMealRecipe(meals);
    }
    fetch();
  }, []);

  useEffect(() => {
    async function fetch() {
      const { drinks } = await DrinksRecommendation();
      setDrinksRecommendation(drinks);
    }
    fetch();
  }, []);

  if (!mealRecipe.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={ `${mealRecipe[0].strMealThumb}` } data-testid="recipe-photo" alt="recipe" />
      <h1 data-testid="recipe-title">{mealRecipe[0].strMeal}</h1>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <h3 data-testid="recipe-category">{mealRecipe[0].strCategory}</h3>
      <MealIngredientsDetails ingredients={ mealRecipe[0] } />
      <p data-testid="instructions">{mealRecipe[0].strInstructions}</p>
      <div>
        <Card recommendation={ drinksRecommendation } />
      </div>
      <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}

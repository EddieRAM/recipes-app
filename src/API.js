export async function MealRecipeById(recipeId) {
  const idRecipe = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

  const recipe = await fetch(idRecipe);
  const results = await recipe.json();
  return results;
}

export async function DrinkRecipeById(drinkId) {
  const idDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;

  const recipe = await fetch(idDrink);
  const results = await recipe.json();
  return results;
}

export async function MealsRecommendation() {
  const idRecipe = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const recipe = await fetch(idRecipe);
  const results = await recipe.json();
  return results;
}

export async function DrinksRecommendation() {
  const idRecipe = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const recipe = await fetch(idRecipe);
  const results = await recipe.json();
  return results;
}

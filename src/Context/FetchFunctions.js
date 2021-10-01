export const fetchFoods = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await response.json();
  return meals;
};

export const fetchDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await response.json();
  return drinks;
};

export const fetchFoodsApi = async (radioBtn, usrQuery, setDataFilter) => {
  if (radioBtn === 'name') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${usrQuery}`);
    const { meals } = await response.json();
    return setDataFilter(meals);
  }

  if (radioBtn === 'ingredients') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${usrQuery}`);
    const { meals } = await response.json();
    return setDataFilter(meals);
  }

  if (radioBtn === 'first-letter') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${usrQuery}`);
    const { meals } = await response.json();
    return setDataFilter(meals);
  }
};

export const fetchDrinksApi = async (radioBtn, usrQuery, setDataFilter) => {
  if (radioBtn === 'name') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${usrQuery}`);
    const { drinks } = await response.json();
    return setDataFilter(drinks);
  }

  if (radioBtn === 'ingredients') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${usrQuery}`);
    const { drinks } = await response.json();
    return setDataFilter(drinks);
  }

  if (radioBtn === 'first-letter') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${usrQuery}`);
    const { drinks } = await response.json();
    return setDataFilter(drinks);
  }
};

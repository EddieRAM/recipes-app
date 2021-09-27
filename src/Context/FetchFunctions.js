export const fetchFoodsApi = async (radioBtn, usrQuery) => {
  if (radioBtn === 'name') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${usrQuery}`);
    const { foods } = await response.json();
    return foods;
  }

  if (radioBtn === 'ingredients') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${usrQuery}`);
    const { foods } = await response.json();
    return foods;
  }

  if (radioBtn === 'first-letter') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${usrQuery}`);
    const { foods } = await response.json();
    return foods;
  }
};

export const fetchDrinksApi = async (radioBtn, usrQuery) => {
  if (radioBtn === 'name') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${usrQuery}`);
    const { drinks } = response.json();
    return drinks;
  }

  if (radioBtn === 'ingredients') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${usrQuery}`);
    const { drinks } = await response.json();
    return drinks;
  }

  if (radioBtn === 'first-letter') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${usrQuery}`);
    const { drinks } = response.json();
    return drinks;
  }
};

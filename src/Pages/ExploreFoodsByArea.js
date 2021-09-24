import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import ProfileAvatar from '../Components/ProfileAvatar';

function ExploreFoodsByArea() {
  const TWELVE = 12;
  const [areas, setAreas] = useState([]);
  const [mealsList, setMealsList] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const getAreas = async () => {
      const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        .then((response) => response.json());
      setAreas(meals);
    };
    getAreas();
  }, []);

  useEffect(() => {
    const getMeals = async () => {
      const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      setMealsList(meals);
    };
    getMeals();
  }, []);

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const renderAreaSelector = (areasList) => (
    <select
      data-testid="explore-by-area-dropdown"
      value={ filter }
      onChange={ ({ target }) => changeFilter(target.value) }
    >
      {
        areasList.map((area) => {
          const areaName = area.strArea;
          return (
            <option
              data-testid={ `${areaName}-option` }
              key={ areaName }
              value={ areaName }
            >
              { areaName }
            </option>
          );
        })
      }
    </select>
  );

  const renderAllMeals = (recipesList, quantity = TWELVE) => (
    <ul>
      {
        recipesList.map((recipe, index) => {
          if (index < quantity) {
            return (
              <li
                key={ recipe.idMeal }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  alt="imagem da receita"
                  src={ recipe.strMealThumb }
                  data-testid={ `${index}-card-img` }
                />
                <span
                  data-testid={ `${index}-card-name` }
                >
                  { recipe.strMeal }
                </span>
              </li>
            );
          }
          return '';
        })
      }
    </ul>
  );

  const filteredMeals = (allMeals, areaFilter) => (
    allMeals.filter((recipe) => recipe.strArea === areaFilter)
  );

  const renderMeals = (recipes, filterRecipes) => {
    if (filterRecipes === 'All') return renderAllMeals(recipes);
    const filteredRecipes = filteredMeals(recipes, filterRecipes);
    return renderAllMeals(filteredRecipes, filteredRecipes.length);
  };

  return (
    <div>
      <h1 data-testid="page-title">Explorar Origem</h1>
      <ProfileAvatar />
      { renderAreaSelector(areas) }
      { renderMeals(mealsList, filter) }
      <Footer />
    </div>
  );
}

export default ExploreFoodsByArea;

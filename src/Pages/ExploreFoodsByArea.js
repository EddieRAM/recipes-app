import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import ProfileAvatar from '../Components/ProfileAvatar';
import '../Styles/ExploreFoodsByArea.css';

function ExploreFoodsByArea() {
  const TWELVE = 12;
  const [areas, setAreas] = useState([]);
  const [mealsList, setMealsList] = useState([]);
  const [filter, setFilter] = useState('');

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
      if (filter === '') {
        setMealsList(meals);
      } else {
        const filteredMeals = meals.filter((recipe) => recipe.strArea === filter);
        setMealsList(filteredMeals);
        console.log(filteredMeals);
      }
    };
    getMeals();
  }, [filter]);

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

  const renderMeals = (recipesList, quantity = TWELVE) => (
    <ul className="recipes-container">
      {
        recipesList.map((recipe, index) => {
          if (index < quantity) {
            return (
              <Link
                to={ `/comidas/${recipe.idMeal}` }
                key={ recipe.idMeal }
              >
                <li
                  data-testid={ `${index}-recipe-card` }
                >
                  <img
                    alt={ recipe.strMeal }
                    src={ recipe.strMealThumb }
                    data-testid={ `${index}-card-img` }
                    width="70%"
                  />
                  <span
                    data-testid={ `${index}-card-name` }
                  >
                    { recipe.strMeal }
                  </span>
                </li>
              </Link>
            );
          }
          return '';
        })
      }
    </ul>
  );

  return (
    <div className="explore-foods-body">
      <h1 data-testid="page-title">Explorar Origem</h1>
      <ProfileAvatar />
      { renderAreaSelector(areas) }
      { renderMeals(mealsList) }
      <Footer />
    </div>
  );
}

export default ExploreFoodsByArea;

import React, { useEffect, useState } from 'react';

function Foods() {
  const [apiFood, setApiFood] = useState([]);
  const [ApiCategory, setApiCategory] = useState([]);
  console.log(ApiCategory);

  useEffect(() => {
    async function MyApiFood() {
      const results = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await results.json();
      let newArray = [];
      meals.forEach((element, index) => {
        const numberLimit = 12;
        if (index < numberLimit) {
          newArray = [...newArray, element];
        }
      });
      setApiFood(newArray);
    }
    MyApiFood();
  }, []);

  useEffect(() => {
    async function MyApiCategory() {
      const results = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const { meals } = await results.json();
      let newArrayCat = [];
      meals.forEach((element, index) => {
        const numberLimit = 5;
        if (index < numberLimit) {
          newArrayCat = [...newArrayCat, element.strCategory];
        }
      });
      setApiCategory(newArrayCat);
    }
    MyApiCategory();
  }, []);

  return (
    <div>
      <div>
        {
          ApiCategory.map((item) => (
            <button
              type="submit"
              key={ item }
              data-testid={ `${item}-category-filter` }
            >
              {item}
            </button>
          ))
        }
      </div>
      {
        apiFood.map((item, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ item.id }>
            <img
              src={ item.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt={ item.strMeal }
            />
            <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
          </div>))
      }
    </div>
  );
}

export default Foods;

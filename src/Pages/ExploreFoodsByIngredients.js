import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Context from '../Context/Context';

function ExploreFoodsByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setApiFood, setStatus } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    async function getIngredients() {
      const results = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const { meals } = await results.json();
      let arrayIngredients = [];
      meals.forEach((element, index) => {
        const numberLimit = 12;
        if (index < numberLimit) {
          arrayIngredients = [...arrayIngredients, element];
        }
      });
      setIngredients(arrayIngredients);
    }
    getIngredients();
  }, []);

  async function getMeals(ingredient) {
    const results = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const { meals } = await results.json();
    let arrayMeals = [];
    meals.forEach((element, index) => {
      const numberLimit = 12;
      if (index < numberLimit) {
        arrayMeals = [...arrayMeals, element];
      }
    });
    setApiFood(arrayMeals);
  }

  return (
    <div>
      <Header />
      <main>
        {
          ingredients.map((item, index) => (
            <div
              key={ item.idIngredient }
              data-testid={ `${index}-ingredient-card` }
              role="presentation"
              onClick={ () => {
                history.push('/comidas');
                setStatus(true);
                getMeals(item.strIngredient);
              } }
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
                alt={ item.strIngredient }
                data-testid={ `${index}-card-img` }
                // role="presentation"
                // onClick={ () => history.push(`/comidas/${item.id}`) }
                // width="50%"
              />
              <p data-testid={ `${index}-card-name` }>{item.strIngredient}</p>
            </div>
          ))
        }
      </main>
      <Footer />
    </div>
  );
}

export default ExploreFoodsByIngredients;

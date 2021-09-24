import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import ProfileAvatar from '../Components/ProfileAvatar';

function ExploreFoodsByIngredients() {
  const [ingredients, setIngredients] = useState([]);

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

  return (
    <div>
      <h1 data-testid="page-title">Explorar Ingredientes</h1>
      <ProfileAvatar />
      <main>
        {
          ingredients.map((item, index) => (
            <div key={ item.idIngredient } data-testid={ `${index}-ingredient-card` }>
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

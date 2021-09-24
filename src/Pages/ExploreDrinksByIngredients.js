import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import ProfileAvatar from '../Components/ProfileAvatar';
import Context from '../Context/Context';

function ExploreDrinksByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const { setApiDrink, setDrinkStatus } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    async function getIngredients() {
      const results = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const { drinks } = await results.json();
      let newArray = [];
      drinks.forEach((element, index) => {
        const numberLimit = 12;
        if (index < numberLimit) {
          newArray = [...newArray, element.strIngredient1];
        }
      });
      setIngredients(newArray);
    }
    getIngredients();
  }, []);

  async function getDrinks(ingredient) {
    const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const { drinks } = await results.json();
    let arrayDrinks = [];
    drinks.forEach((element, index) => {
      const numberLimit = 12;
      if (index < numberLimit) {
        arrayDrinks = [...arrayDrinks, element];
      }
    });
    setApiDrink(arrayDrinks);
  }

  return (
    <div>
      <h1 data-testid="page-title">Explorar Ingredientes</h1>
      <ProfileAvatar />
      <main>
        {
          ingredients.map((item, index) => (
            <div
              key={ item }
              data-testid={ `${index}-ingredient-card` }
              role="presentation"
              onClick={ () => {
                history.push('/bebidas'); getDrinks(item); setDrinkStatus(true);
              } }
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${item}-Small.png` }
                alt={ item }
                data-testid={ `${index}-card-img` }
                // role="presentation"
                // onClick={ () => history.push(`/comidas/${item.id}`) }
                // width="50%"
              />
              <p data-testid={ `${index}-card-name` }>{item}</p>
            </div>
          ))
        }
      </main>
      <Footer />
    </div>
  );
}

export default ExploreDrinksByIngredients;

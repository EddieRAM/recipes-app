import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import ProfileAvatar from '../Components/ProfileAvatar';

function ExploreDrinksByIngredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function getIngredients() {
      const results = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const { drinks } = await results.json();
      let newArrayCat = [];
      drinks.forEach((element, index) => {
        const numberLimit = 12;
        if (index < numberLimit) {
          newArrayCat = [...newArrayCat, element.strIngredient1];
        }
      });
      setIngredients(newArrayCat);
    }
    getIngredients();
  }, []);
  console.log(ingredients);
  return (
    <div>
      <h1 data-testid="page-title">Explorar Ingredientes</h1>
      <ProfileAvatar />
      <main>
        {
          ingredients.map((item, index) => (
            <div key={ item } data-testid={ `${index}-ingredient-card` }>
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

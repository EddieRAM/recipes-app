import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ProgressFood({ match: { params: { id } } }) {
  const [apiId, setApiID] = useState({});
  const [locationStorage, setlocationStorage] = useState({
    cocktails: {},
    meals: {},
  });

  function changeLocationStorage(item) {
    console.log(item);
  }

  useEffect(() => {
    async function ApiId() {
      const results = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await results.json();
      setApiID(meals[0]);
    }
    ApiId();
  }, [id]);

  return (
    <div>
      <img src={ apiId.strMealThumb } alt={ apiId.strTags } data-testid="recipe-photo" />
      <h5 data-testid="recipe-title">{apiId.strMeal}</h5>
      <button type="submit" data-testid="share-btn">compartilhar</button>
      <button type="submit" data-testid="favorite-btn">Favorito</button>
      <p data-testid="recipe-category">{apiId.strCategory}</p>
      <div>
        {
          Object.entries(apiId)
            .filter((iten) => iten[0]
              .includes('strIngredient') && iten[1] !== '' && iten[1] !== null)
            .map((element, index) => (
              <label
                key={ index }
                htmlFor={ element[0] }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ element[0] }
                  name={ element[0] }
                  onClick={ () => changeLocationStorage(element[1]) }
                />
                {element[1]}
              </label>
            ))
        }
      </div>
      <p data-testid="instructions">{apiId.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

ProgressFood.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.object,
  ).isRequired,
};

export default ProgressFood;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ProgressDrink({ match: { params: { id } } }) {
  const [apiId, setApiID] = useState({});

  useEffect(() => {
    async function ApiId() {
      const r = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { drinks } = await r.json();
      setApiID(drinks[0]);
    }
    ApiId();
  }, [id]);

  return (
    <div>
      <img src={ apiId.strDrinkThumb } alt={ apiId.idDrink } data-testid="recipe-photo" />
      <h5 data-testid="recipe-title">{apiId.strDrink}</h5>
      <button type="submit" data-testid="share-btn">compartilhar</button>
      <button type="submit" data-testid="favorite-btn">Favorito</button>
      <p data-testid="recipe-category">{apiId.strCategory}</p>
      <p>{apiId.strAlcoholic}</p>
      <div>
        {
          Object.entries(apiId)
            .filter((iten) => iten[0]
              .includes('strIngredient') && iten[1] !== '' && iten[1] !== null)
            .map((element, index) => (
              <label
                key={ index }
                htmlFor={ element }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ element }
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

ProgressDrink.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.object,
  ).isRequired,
};

export default ProgressDrink;

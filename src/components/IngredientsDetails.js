import React from 'react';
import PropTypes from 'prop-types';

export default function IngredientsDetails({ ingredients }) {
  if (!ingredients) {
    return <div>Loading...</div>;
  }

  function ingredientItem(ingredient, index) {
    return (
      <li
        key={ ingredient[1] + index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {ingredient[1]}
      </li>);
  }

  return (
    <div>
      <ul>
        {
          Object.entries(ingredients)
            .filter((item) => item[0]
              .includes('strIngredient') && item[1] && item[1].length > 1)
            .map((ingredient, index) => (
              ingredientItem(ingredient, index)
            ))
        }
      </ul>
      <ul>
        {
          Object.entries(ingredients)
            .filter((item) => item[0]
              .includes('strMeasure') && item[1] && item[1].length > 1)
            .map((ingredient, index) => (
              ingredientItem(ingredient, index)
            ))
        }
      </ul>
    </div>
  );
}

IngredientsDetails.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

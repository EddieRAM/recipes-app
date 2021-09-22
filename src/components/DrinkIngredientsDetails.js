import React from 'react';

export default function DrinkIngredientsDetails({ ingredients }) {
  if (!ingredients) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ul>
        {
          Object.entries(ingredients)
            .filter((item) => item[0]
              .includes('strIngredient') && item[1])
            .map((ingredient) => (
              <li key={ ingredient[1] }>{ingredient[1]}</li>
            ))
        }
      </ul>
      <ul>
        {
          Object.entries(ingredients)
            .filter((item) => item[0]
              .includes('strMeasure') && item[1])
            .map((ingredient) => (
              <li key={ ingredient[1] }>{ingredient[1]}</li>
            ))
        }
      </ul>
    </div>
  );
}

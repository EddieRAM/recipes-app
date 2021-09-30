import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../Styles/Progress.css';
import MealFavoriteButton from '../Components/MealFavoriteButton';
import Share from '../Components/Share';

function ProgressFood({ match: { params: { id } }, history }) {
  const [apiId, setApiID] = useState({});
  const [arrayIngr, setArrayIngr] = useState([]);
  const [objIngredient, setObjIngredient] = useState({});
  const [ingredients, setIngredients] = useState({});
  const [disabled, setDisabled] = useState('disabled');
  const [arrayStorage, setArrayStorage] = useState([]);
  const [localStorageS, setLocalStorage] = useState({
    cocktails: {},
    meals: {},
  });

  useEffect(() => {
    async function ApiId() {
      const results = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await results.json();
      setApiID(meals[0]);
      const ingredientFilter = Object.entries(meals[0])
        .filter((iten) => iten[0].includes('strIngredient')
      && iten[1] !== '' && iten[1] !== null);
      const newObj = {};
      const arrayNew = [];
      ingredientFilter.forEach((element) => {
        const iten = element[1];
        arrayNew.push(iten);
        newObj[iten] = false;
      });
      setIngredients(newObj);
      setObjIngredient(newObj);
      setArrayIngr(arrayNew);
    }
    ApiId();
  }, [id]);

  useEffect(() => {
    const itemLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (itemLocalStorage !== null) {
      setLocalStorage(itemLocalStorage);
      const { meals } = itemLocalStorage;
      if (meals !== {} && meals[id]) {
        setArrayStorage(meals[id]);
      }
    }
  }, [id]);

  useEffect(() => {
    const arr = arrayStorage;
    const ing = objIngredient;
    if (arr !== [] && ing !== {}) {
      arr.forEach((element) => {
        ing[element] = true;
      });
      setIngredients(ing);
    }
  }, [objIngredient, arrayStorage]);

  useEffect(() => {
    const save = localStorageS;
    localStorage.setItem('inProgressRecipes', JSON.stringify(save));
  }, [localStorageS]);

  useEffect(() => {
    let ingTrue = 0;
    Object.entries(ingredients).forEach((element) => {
      if (element[1] === true) {
        ingTrue += 1;
      }
    });
    if (ingTrue === arrayIngr.length && arrayIngr.length !== 0) {
      setDisabled('');
    }
  }, [ingredients, arrayIngr]);

  function changeLocationStorageFalse({ target }) {
    const { checked, name } = target;
    if (checked === false) {
      const filterLocalMeals = localStorageS.meals[id].filter((e) => e !== name);
      setLocalStorage({
        ...localStorageS,
        meals: {
          ...localStorageS.meals,
          [id]: filterLocalMeals,
        },
      });
      setDisabled('disabled');
    }
  }

  function changeLocationStorageTrue({ target }) {
    const { checked, name } = target;
    if (checked === true) {
      if (localStorageS.meals[id] !== [] && localStorageS.meals[id]) {
        const findMealId = localStorageS.meals[id].find((e) => e === name);
        if (!findMealId) {
          setLocalStorage({
            ...localStorageS,
            meals: {
              ...localStorageS.meals,
              [id]: [...localStorageS.meals[id], name],
            },
          });
        }
      } else {
        setLocalStorage({
          ...localStorageS,
          meals: {
            ...localStorageS.meals,
            [id]: [name],
          },
        });
      }
    }
  }

  function changeChecked({ target }) {
    const { checked, name } = target;
    setIngredients({
      ...ingredients,
      [name]: checked,
    });
  }

  return (
    <div>
      <img src={ apiId.strMealThumb } alt={ apiId.strTags } data-testid="recipe-photo" />
      <h5 data-testid="recipe-title">{apiId.strMeal}</h5>
      <Share />
      <MealFavoriteButton mealRecipe={ apiId } id={ id } />
      <p data-testid="recipe-category">{apiId.strCategory}</p>
      <div>
        {
          arrayIngr.map((element, index) => (
            <div key={ index }>
              <label
                htmlFor={ element }
                data-testid={ `${index}-ingredient-step` }
                className={ ingredients[element] === true ? 'line' : 'lineNone' }
              >
                <input
                  type="checkbox"
                  id={ element }
                  checked={ ingredients[element] }
                  name={ element }
                  onChange={ (event) => {
                    changeChecked(event);
                    changeLocationStorageTrue(event);
                    changeLocationStorageFalse(event);
                  } }
                />
                {element}
              </label>
            </div>
          ))
        }
      </div>
      <p data-testid="instructions">{apiId.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disabled }
        onClick={ () => { history.push('/receitas-feitas'); } }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

ProgressFood.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.object,
  ).isRequired,
  history: PropTypes.arrayOf.isRequired,
};

export default ProgressFood;

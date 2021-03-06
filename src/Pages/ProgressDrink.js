import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DrinkFavoriteButton from '../Components/DrinkFavoriteButton';
import Share from '../Components/Share';
import '../Styles/InProgress.css';

function ProgressDrink({ match: { params: { id } }, history }) {
  const [apiId, setApiID] = useState({});
  const [arrayIngr, setArrayIngr] = useState([]);
  const [objIngredient, setObjIngredient] = useState({});
  const [ingredients, setIngredients] = useState({});
  const [disabled, setDisabled] = useState('disabled');
  const [arrayStorageIngr, setArrayStorageIngr] = useState([]);
  const [localStorageS, setLocalStorage] = useState({
    cocktails: {},
    meals: {},
  });
  const [storageRecipes, setStorageRecipes] = useState([]);

  useEffect(() => {
    const itemLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const doneRecioes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (itemLocalStorage !== null) {
      setLocalStorage(itemLocalStorage);
      const { cocktails } = itemLocalStorage;
      if (cocktails !== {} && cocktails[id]) {
        setArrayStorageIngr(cocktails[id]);
      }
    }
    if (doneRecioes !== null) {
      setStorageRecipes(doneRecioes);
    }
  }, [id]);

  useEffect(() => {
    const arr = arrayStorageIngr;
    const ing = objIngredient;
    if (arr !== [] && ing !== {}) {
      arr.forEach((element) => {
        ing[element] = true;
      });
      setIngredients(ing);
    }
  }, [objIngredient, arrayStorageIngr]);

  useEffect(() => {
    const save = localStorageS;
    localStorage.setItem('inProgressRecipes', JSON.stringify(save));
  }, [localStorageS]);

  useEffect(() => {
    async function ApiId() {
      const r = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { drinks } = await r.json();
      setApiID(drinks[0]);
      const filterArrayIngredient = Object.entries(drinks[0])
        .filter((iten) => iten[0].includes('strIngredient')
      && iten[1] !== '' && iten[1] !== null);
      const newObj = {};
      const arrayNew = [];
      filterArrayIngredient.forEach((element) => {
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
      const localCocktails = localStorageS.cocktails;
      const filterLocalCock = localCocktails[id].filter((e) => e !== name);
      setLocalStorage({
        ...localStorageS,
        cocktails: {
          ...localCocktails,
          [id]: filterLocalCock,
        },
      });
      setDisabled('disabled');
    }
  }

  function changeLocationStorageTrue({ target }) {
    const { checked, name } = target;
    if (checked === true) {
      const localCocktail = localStorageS.cocktails;
      if (localCocktail[id] !== [] && localCocktail[id]) {
        const findCockId = localCocktail[id].find((e) => e === name);
        if (!findCockId) {
          setLocalStorage({
            ...localStorageS,
            cocktails: {
              ...localCocktail,
              [id]: [...localCocktail[id], name],
            },
          });
        }
      } else {
        setLocalStorage({
          ...localStorageS,
          cocktails: {
            ...localCocktail,
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

  function handlerClick() {
    const doneRecipe = {
      id: apiId.idDrink,
      type: 'bebida',
      area: '',
      category: apiId.strCategory,
      alcoholicOrNot: apiId.strAlcoholic,
      name: apiId.strDrink,
      image: apiId.strMealThumb,
      doneDate: new Date(),
      tags: [],
    };
    const local = [...storageRecipes, doneRecipe];
    const local2 = localStorageS;
    local2.cocktails[id] = [];
    localStorage.setItem('doneRecipes', JSON.stringify(local));
    localStorage.setItem('inProgressRecipes', JSON.stringify(local2));
    history.push('/receitas-feitas');
  }

  return (
    <div className="progress-container">
      <img
        className="progress-img"
        src={ apiId.strDrinkThumb }
        alt={ apiId.idDrink }
        data-testid="recipe-photo"
      />
      <h5 data-testid="recipe-title">{apiId.strDrink}</h5>
      <Share />
      <DrinkFavoriteButton drinkRecipe={ apiId } id={ id } />
      <p data-testid="recipe-category">{apiId.strCategory}</p>
      <p>{apiId.strAlcoholic}</p>
      <div>
        {
          arrayIngr.map((element, index) => (
            <label
              key={ index }
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
          ))
        }
      </div>
      <p
        className="instructions"
        data-testid="instructions"
      >
        {apiId.strInstructions}

      </p>
      <button
        className="finish-recipe"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disabled }
        onClick={ () => { handlerClick(); } }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

ProgressDrink.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.object,
  ).isRequired,
  history: PropTypes.arrayOf.isRequired,
};

export default ProgressDrink;

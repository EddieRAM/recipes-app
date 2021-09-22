import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Drinks() {
  const [apiDrink, setApiDrink] = useState([]);
  const [reserve, setReserve] = useState([]);
  const [apiCategoryDrink, setCategoryDrink] = useState([]);
  const [verification, setNameVerification] = useState('');

  useEffect(() => {
    async function MyApiDrink() {
      const results = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await results.json();
      let newArray = [];
      drinks.forEach((element, index) => {
        const numberLimit = 12;
        if (index < numberLimit) {
          newArray = [...newArray, element];
        }
      });
      setApiDrink(newArray);
      setReserve(newArray);
    }
    MyApiDrink();
  }, []);

  useEffect(() => {
    async function MyApiCategoryDrink() {
      const results = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const { drinks } = await results.json();
      let newArrayCat = [];
      drinks.forEach((element, index) => {
        const numberLimit = 5;
        if (index < numberLimit) {
          newArrayCat = [...newArrayCat, element.strCategory];
        }
      });
      setCategoryDrink(newArrayCat);
    }
    MyApiCategoryDrink();
  }, []);

  useEffect(() => {
    async function CallCategoryAPI() {
      if (verification !== '') {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${verification}`;
        const results = await fetch(url);
        const { drinks } = await results.json();
        let newS = [];
        drinks.forEach((element, index) => {
          const number = 12;
          if (index < number) {
            newS = [...newS, element];
          }
        });
        setApiDrink(newS);
      }
    }
    CallCategoryAPI();
  }, [verification]);

  function checkNameToReleaseApi(item) {
    if (item !== verification) {
      setNameVerification(item);
    } else {
      setApiDrink(reserve);
      setNameVerification('');
    }
  }

  return (
    <div>
      <div>
        <button
          onClick={ () => { setApiDrink(reserve); setNameVerification(''); } }
          type="submit"
          data-testid="All-category-filter"
        >
          All
        </button>
        {
          apiCategoryDrink.map((item) => (
            <button
              type="submit"
              key={ item }
              data-testid={ `${item}-category-filter` }
              onClick={ () => { checkNameToReleaseApi(item); } }
            >
              {item}
            </button>
          ))
        }
      </div>
      {
        apiDrink.map((item, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ item.id }>
            <Link to={ `/bebidas/${item.idDrink}` }>
              <img
                src={ item.strDrinkThumb }
                data-testid={ `${index}-card-img` }
                alt={ item.strDrink }
              />
              <p data-testid={ `${index}-card-name` }>{item.strDrink}</p>
            </Link>
          </div>))
      }
    </div>
  );
}

export default Drinks;

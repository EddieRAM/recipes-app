import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../Styles/RecipeCards.css';
import Context from '../Context/Context';

function Drinks() {
  const { apiDrink, setApiDrink, drinkStatus, setDrinkStatus } = useContext(Context);
  const [reserve, setReserve] = useState([]);
  const [apiCategoryDrink, setApiCategoryDrink] = useState([]);
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
    if (drinkStatus === false) MyApiDrink();
  }, [setApiDrink, drinkStatus]);

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
      setApiCategoryDrink(newArrayCat);
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
  }, [verification, setApiDrink]);

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
      <header>
        <h1 data-testid="page-title">Bebidas</h1>
        <Header />
      </header>
      <div className="recipe-categories">
        <button
          onClick={ () => {
            setApiDrink(reserve); setNameVerification(''); setDrinkStatus(false);
          } }
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
      <div className="recipes-container">

        {
          apiDrink.map((item, index) => (
            <div
              className="recipe-card"
              data-testid={ `${index}-recipe-card` }
              key={ item.id }
            >
              <Link to={ `/bebidas/${item.idDrink}` }>
                <img
                  src={ item.strDrinkThumb }
                  data-testid={ `${index}-card-img` }
                  alt={ item.strDrink }
                  width="300px"
                />
                <p
                  className="card-name"
                  data-testid={ `${index}-card-name` }
                >
                  {item.strDrink}
                </p>
              </Link>
            </div>))
        }
        <Footer />
      </div>
    </div>
  );
}

export default Drinks;

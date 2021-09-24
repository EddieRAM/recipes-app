import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../Components/Footer';

function Foods() {
  const [apiFood, setApiFood] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [ApiCategory, setApiCategory] = useState([]);
  const [nameCategory, setnameCategory] = useState('');

  useEffect(() => {
    async function MyApiFood() {
      const results = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await results.json();
      let newArray = [];
      meals.forEach((element, index) => {
        const numberLimit = 12;
        if (index < numberLimit) {
          newArray = [...newArray, element];
        }
      });
      setApiFood(newArray);
      setReservation(newArray);
    }
    MyApiFood();
  }, []);

  useEffect(() => {
    async function MyApiCategory() {
      const results = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const { meals } = await results.json();
      let newArrayCat = [];
      meals.forEach((element, index) => {
        const numberLimit = 5;
        if (index < numberLimit) {
          newArrayCat = [...newArrayCat, element.strCategory];
        }
      });
      setApiCategory(newArrayCat);
    }
    MyApiCategory();
  }, []);

  useEffect(() => {
    async function CallCategoryAPI() {
      if (nameCategory !== '') {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${nameCategory}`;
        const results = await fetch(url);
        const { meals } = await results.json();
        let newS = [];
        meals.forEach((element, index) => {
          const number = 12;
          if (index < number) {
            newS = [...newS, element];
          }
        });
        setApiFood(newS);
      }
    }
    CallCategoryAPI();
  }, [nameCategory]);

  function verificationNameCategory(item) {
    if (item !== nameCategory) {
      setnameCategory(item);
    } else {
      setnameCategory('');
      setApiFood(reservation);
    }
  }

  return (
    <div>
      <header>
        <h1 data-testid="page-title">Comidas</h1>
        <Header />
      </header>
      <div>
        <button
          onClick={ () => { setApiFood(reservation); setnameCategory(''); } }
          type="submit"
          data-testid="All-category-filter"
        >
          All
        </button>
        {
          ApiCategory.map((item) => (
            <button
              type="submit"
              key={ item }
              data-testid={ `${item}-category-filter` }
              onClick={ () => { verificationNameCategory(item); } }
            >
              {item}
            </button>
          ))
        }
      </div>
      {
        apiFood.map((item, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ item.id }>
            <Link to={ `/comidas/${item.idMeal}` }>
              <img
                src={ item.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt={ item.strMeal }
              />
              <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
            </Link>
          </div>))
      }
      <Footer />
    </div>
  );
}

export default Foods;

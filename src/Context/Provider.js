import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { fetchDrinksApi, fetchFoodsApi } from './FetchFunctions';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [usrQuery, setSearch] = useState('');
  const [radioBtn, setRadioBtn] = useState(' ingredients');
  const [drinks, setDrinks] = useState([]);
  const [foods, setFoods] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [compare, setCompare] = useState([]);
  const [apiFood, setApiFood] = useState([]);
  const [status, setStatus] = useState(false);
  const [apiDrink, setApiDrink] = useState([]);
  const [drinkStatus, setDrinkStatus] = useState(false);
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
    if (status === false) MyApiFood();
  }, [status]);

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

  const handleClick = (path) => {
    if (path === '/comidas') {
      fetchFoodsApi(radioBtn, usrQuery, setDataFilter);
    } else {
      fetchDrinksApi(radioBtn, usrQuery, setDataFilter);
    }
  };

  const ContextValue = {
    data,
    setData,
    setSearch,
    usrQuery,
    radioBtn,
    setRadioBtn,
    handleClick,
    drinks,
    setDrinks,
    foods,
    setFoods,
    dataFilter,
    compare,
    setCompare,
    apiFood,
    setApiFood,
    status,
    setStatus,
    apiDrink,
    setApiDrink,
    drinkStatus,
    setDrinkStatus,
    reservation,
    ApiCategory,
    setnameCategory,
    nameCategory,
  };

  return (
    <Context.Provider value={ ContextValue }>
      {children}
    </Context.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.object,
}.isRequired;
export default Provider;

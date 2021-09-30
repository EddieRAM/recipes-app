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
  const [reserve, setReserve] = useState([]);
  const [apiCategoryDrink, setApiCategoryDrink] = useState([]);
  const [verification, setNameVerification] = useState('');

  useEffect(() => {
    async function MyApiFood() {
      const apiFetch = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await apiFetch.json();
      const MAX = 12;
      const results = meals.slice(0, MAX);
      setApiFood(results);
      setReservation(results);
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
        console.log(newS);
        setApiFood(newS);
      }
    }
    CallCategoryAPI();
  }, [nameCategory]);

  useEffect(() => {
    async function MyApiDrink() {
      const results = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const Apidrinks = await results.json();
      let newArray = [];
      Apidrinks.drinks.forEach((element, index) => {
        const numberLimits = 12;
        if (index < numberLimits) {
          newArray = [...newArray, element];
        }
      });
      setApiDrink(newArray);
      setReserve(newArray);
    }
    if (drinkStatus === false) MyApiDrink();
  }, [drinkStatus]);

  useEffect(() => {
    async function MyApiCategoryDrink() {
      const results = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const Catdrinks = await results.json();
      let newArrayCats = [];
      Catdrinks.drinks.forEach((element, index) => {
        const numberLi = 5;
        if (index < numberLi) {
          newArrayCats = [...newArrayCats, element.strCategory];
        }
      });
      setApiCategoryDrink(newArrayCats);
    }
    MyApiCategoryDrink();
  }, []);

  useEffect(() => {
    async function CallCategoryAPI() {
      if (verification !== '') {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${verification}`;
        const results = await fetch(url);
        const Filterdrinks = await results.json();
        let newAr = [];
        Filterdrinks.drinks.forEach((element, index) => {
          const numberMag = 12;
          if (index < numberMag) {
            newAr = [...newAr, element];
          }
        });
        setApiDrink(newAr);
      }
    }
    CallCategoryAPI();
  }, [verification]);

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
    setDataFilter,
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
    reserve,
    apiCategoryDrink,
    setNameVerification,
    verification,
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

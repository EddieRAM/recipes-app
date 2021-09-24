import React, { useState } from 'react';
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

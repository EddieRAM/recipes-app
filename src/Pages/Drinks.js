import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { fetchDrinks } from '../Context/FetchFunctions';
import Context from '../Context/Context';
import '../Styles/RecipeCards.css';

function Drinks() {
  const {
    /* apiDrink, */
    setApiDrink,
    setDrinkStatus,
    reserve,
    apiCategoryDrink,
    verification,
    setNameVerification,
    setDrinks,
    dataFilter,
    drinks,
    compare,
    setCompare,
  } = useContext(Context);

  function checkNameToReleaseApi(item) {
    if (item !== verification) {
      setNameVerification(item);
    } else {
      setApiDrink(reserve);
      setNameVerification('');
    }
  }

  useEffect(() => {
    const fetchDrink = async () => {
      const response = await fetchDrinks();
      const MAX = 12;
      const results = response.slice(0, MAX);
      setDrinks(results);
    };
    fetchDrink();
  }, [setDrinks]);

  useEffect(() => {
    const renderItens = () => {
      if (dataFilter <= 0) {
        return setCompare(drinks);
      }
      return setCompare(dataFilter);
    };
    renderItens();
  }, [setCompare, compare, drinks, dataFilter]);

  const fnAlert = (func, message) => {
    func(message);
  };

  if (dataFilter === null) {
    const msg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
    return fnAlert(alert, msg);
  }

  if (dataFilter.length === 1) {
    return <Redirect to={ `/bebidas/${dataFilter[0].idDrink}` } />;
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
          compare.map((item, index) => (
            <div
              className="recipe-card"
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <Link to={ `/bebidas/${item.idDrink}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ item.strDrinkThumb }
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

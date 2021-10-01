import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Context from '../Context/Context';
import '../Styles/RecipeCards.css';

function Foods() {
  const {
    apiFood,
    setStatus,
    ApiCategory,
    dataFilter,
    compare,
    setCompare,
    setApiFood,
    reservation,
    setnameCategory,
    nameCategory,
  } = useContext(Context);

  function verificationNameCategory(item) {
    if (item !== nameCategory) {
      setnameCategory(item);
    } else {
      setnameCategory('');
      setApiFood(reservation);
    }
  }

  useEffect(() => {
    const renderItens = () => {
      if (dataFilter.length === 0) {
        setCompare(apiFood);
      } else {
        setCompare(dataFilter);
      }
    };
    renderItens();
  }, [setCompare, compare, apiFood, dataFilter]);

  const fnAlert = (func, message) => {
    func(message);
  };

  if (dataFilter === null) {
    const msg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
    return fnAlert(alert, msg);
  }

  if (dataFilter.length === 1) {
    return <Redirect to={ `/comidas/${dataFilter[0].idMeal}` } />;
  }

  return (
    <div>
      <header>
        <h1 data-testid="page-title">Comidas</h1>
        <Header />
      </header>
      <div className="recipe-categories">
        <button
          onClick={ () => {
            setApiFood(reservation); setnameCategory(''); setStatus(false);
          } }
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
      <div className="recipes-container">
        {
          compare.map((item, index) => (
            <div
              className="recipe-card"
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <Link to={ `/comidas/${item.idMeal}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                  width="300px"
                />
                <p
                  className="card-name"
                  data-testid={ `${index}-card-name` }
                >
                  {item.strMeal}
                </p>
              </Link>
            </div>))
        }
        <Footer />
      </div>
    </div>
  );
}

export default Foods;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Context from '../Context/Context';

function Foods() {
  const {
    apiFood,
    setApiFood,
    setStatus,
    reservation,
    ApiCategory,
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
          apiFood.map((item, index) => (
            <div
              className="recipe-card"
              data-testid={ `${index}-recipe-card` }
              key={ item.id }
            >
              <Link to={ `/comidas/${item.idMeal}` }>
                <img
                  src={ item.strMealThumb }
                  data-testid={ `${index}-card-img` }
                  alt={ item.strMeal }
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

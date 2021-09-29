import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../Styles/RecipeCards.css';
import Context from '../Context/Context';

function Drinks() {
  const {
    apiDrink,
    setApiDrink,
    setDrinkStatus,
    reserve,
    apiCategoryDrink,
    verification,
    setNameVerification,
  } = useContext(Context);

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

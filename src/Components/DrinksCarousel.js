/* import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';

export default function DrinksCarousel({ recommendation }) {
  const gliderRef = useRef(null);
  if (!recommendation) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="App"
    >
      <Glide
        ref={ gliderRef }
        throttle={ 0 }
        type="slider"
        customSlideAnimation={ {
          timeout: 500,
          classNames: 'fade',
        } }
        perView={ 1 }
        startAt={ 0 }
        focusAt={ 0 }
        rewind="false"
      >
        {recommendation.map((item, index) => {
          const max = 6;
          if (index < max) {
            return (
              <div
                id={ `${index}-recomendation-card` }
                data-testid={ `${index}-recomendation-card` }
              >
                <img src={ `${item.strDrinkThumb}` } alt={ item.strMeal } />
                <h3>{item.strAlcoholic}</h3>
                <h1 data-testid={ `${index}-recomendation-title` }>{item.strDrink}</h1>
              </div>
            );
          }
          return <div key="index" />;
        })}
      </Glide>
    </div>
  );
}

DrinksCarousel.propTypes = {
  recommendation: PropTypes.arrayOf(PropTypes.object).isRequired,
};
 */

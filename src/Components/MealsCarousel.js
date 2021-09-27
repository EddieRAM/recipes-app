import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';

export default function MealsCarousel({ recommendation }) {
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
        perView={ 2 }
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
                <img src={ `${item.strMealThumb}` } alt={ item.strMeal } />
                <h3>{item.strCategory}</h3>
                <h1 data-testid={ `${index}-recomendation-title` }>{item.strMeal}</h1>
              </div>
            );
          }
          return <div key="index" />;
        })}
      </Glide>
    </div>
  );
}

MealsCarousel.propTypes = {
  recommendation: PropTypes.arrayOf(PropTypes.object).isRequired,
};

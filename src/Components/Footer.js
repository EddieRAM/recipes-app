import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

// solução para uso das imagens encontrada no site abaixo
// https://qastack.com.br/programming/39999367/how-do-i-reference-a-local-image-in-react
export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <Link to="/bebidas">
        <img
          className="footer-button"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="botao de bebidas"
        />
      </Link>
      <Link to="/explorar">
        <img
          className="footer-button"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="botao de explorar"
        />
      </Link>
      <Link to="/comidas">
        <img
          className="footer-button"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="botao de comidas"
        />
      </Link>
    </footer>
  );
}

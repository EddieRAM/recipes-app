import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../Styles/Profile.css';

export default function Profile({ history }) {
  const [email, setEmail] = useState('');
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setEmail(JSON.parse(localStorage.getItem('user')).email);
    }
  }, []);

  function handleClick() {
    localStorage.clear();
    history.push('/');
  }
  return (
    <div>
      <Header />
      <main className="profile-container">
        <p data-testid="profile-email">{ email }</p>
        <button
          className="profile-button"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          className="profile-button"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          className="profile-button"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Sair
        </button>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

// https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/clear

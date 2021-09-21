import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonStatus, setButtonStatus] = useState(true);

  useEffect(() => {
    const emailValidInput = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const MIN_LENGTH = 6;
    if (email.match(emailValidInput) && password.length > MIN_LENGTH) {
      setButtonStatus(false);
    }
  }, [email, password]);

  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  }

  return (
    <div>
      <input
        type="email"
        data-testid="email-input"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        type="password"
        data-testid="password-input"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ buttonStatus }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

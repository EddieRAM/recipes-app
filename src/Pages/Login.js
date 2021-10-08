import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import '../Styles/Login.css';

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
    <div className="login">
      <div className="login-container">
        <Form className="login-form">
          <h1 className="login-title">Login</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className="login-input"
              type="email"
              data-testid="email-input"
              onChange={ ({ target }) => setEmail(target.value) }
              placeholder="Insira seu e-mail"
            />
            <span className="login-input-border" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              className="login-input"
              type="password"
              data-testid="password-input"
              onChange={ ({ target }) => setPassword(target.value) }
              placeholder="Insira sua senha"
            />
            <span className="login-input-border" />
          </Form.Group>
          <Button
            className="login-submit"
            type="button"
            size="lg"
            variant="success"
            data-testid="login-submit-btn"
            disabled={ buttonStatus }
            onClick={ handleClick }
          >
            Entrar
          </Button>
        </Form>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

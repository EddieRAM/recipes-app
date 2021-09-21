import React, { useEffect, useState } from 'react';

export default function Login() {
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
      >
        Entrar
      </button>
    </div>
  );
}

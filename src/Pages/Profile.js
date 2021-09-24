import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../Components/Footer';

export default function Profile() {
  return (
    <div>
      <h1 data-testid="page-title">Perfil</h1>
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Para a tela de perfil"
      />
      <Footer />
    </div>
  );
}

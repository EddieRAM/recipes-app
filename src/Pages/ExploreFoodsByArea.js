import React from 'react';
import searchIcon from '../images/searchIcon.svg';
import Footer from '../Components/Footer';
import ProfileAvatar from '../Components/ProfileAvatar';

function ExploreFoodsByArea() {
  return (
    <div>
      <h1 data-testid="page-title">Explorar Origem</h1>
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="Para a tela de perfil"
      />
      <ProfileAvatar />
      <Footer />
    </div>
  );
}

export default ExploreFoodsByArea;

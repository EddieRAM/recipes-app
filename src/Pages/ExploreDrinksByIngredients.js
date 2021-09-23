import React from 'react';
import Footer from '../Components/Footer';
import ProfileAvatar from '../Components/ProfileAvatar';

function ExploreDrinksByIngredients() {
  return (
    <div>
      <h1 data-testid="page-title">Explorar Ingredientes</h1>
      <ProfileAvatar />
      <Footer />
    </div>
  );
}

export default ExploreDrinksByIngredients;

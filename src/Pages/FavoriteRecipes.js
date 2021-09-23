import React from 'react';
import ProfileAvatar from '../Components/ProfileAvatar';

function FavoriteRecipes() {
  return (
    <header>
      <h1 data-testid="page-title">Receitas Favoritas</h1>
      <ProfileAvatar />
    </header>
  );
}

export default FavoriteRecipes;

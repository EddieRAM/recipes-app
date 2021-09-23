import React from 'react';
import profileIcon from '../images/profileIcon.svg';

export default function ProfileIcon() {
  return (
    <img
      data-testid="profile-top-btn"
      src={ profileIcon }
      alt="Para a tela de perfil"
    />
  );
}

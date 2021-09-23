import React from 'react';
import Footer from '../Components/Footer';
import ProfileAvatar from '../Components/ProfileAvatar';

export default function Profile() {
  return (
    <div>
      <h1 data-testid="page-title">Perfil</h1>
      <ProfileAvatar />
      <Footer />
    </div>
  );
}

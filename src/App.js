import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router';
import Login from './Pages/Login';
import Explore from './Pages/Explore';
import Foods from './Pages/Foods';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" />
      <Route exact path="/comidas/:id" />
      <Route exact path="/bebidas/:id" />
      <Route path="/comidas/:id/in-progress" />
      <Route path="/bebidas/:id/in-progress" />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" />
      <Route exact path="/explorar/bebidas" />
      <Route exact path="/explorar/comidas/ingredientes" />
      <Route path="/explorar/bebidas/ingredientes" />
      <Route path="/explorar/comidas/area" />
      <Route path="/perfil" />
      <Route path="/receitas-feitas" />
      <Route path="/receitas-favoritas" />
    </Switch>
  );
}

export default App;

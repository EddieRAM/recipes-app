import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router';
import Login from './Pages/Login';
import Explore from './Pages/Explore';
import Foods from './Pages/Foods';
import Drinks from './Pages/Drinks';
import ExploreFoods from './Pages/ExploreFoods';
import ExploreDrinks from './Pages/ExploreDrinks';
import FoodsByIngredient from './Pages/FoodsByIngredient';
import DrinksByIngredient from './Pages/DrinksByIngredient';
import FoodsByOrigin from './Pages/FoodsByOrigin';
import Profile from './Pages/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas/:id" />
      <Route exact path="/bebidas/:id" />
      <Route path="/comidas/:id/in-progress" />
      <Route path="/bebidas/:id/in-progress" />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route path="/explorar/comidas/ingredientes" component={ FoodsByIngredient } />
      <Route path="/explorar/bebidas/ingredientes" component={ DrinksByIngredient } />
      <Route path="/explorar/comidas/area" component={ FoodsByOrigin } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" />
      <Route path="/receitas-favoritas" />
    </Switch>
  );
}

export default App;

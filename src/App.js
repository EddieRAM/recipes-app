import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Profile from './Pages/Profile';
import Drinks from './Pages/Drinks';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import MadeRecipes from './Pages/MadeRecipes';
import Explore from './Pages/Explore';
import ExploreFoods from './Pages/ExploreFoods';
import ExploreDrinks from './Pages/ExploreDrinks';
import ExploreFoodsByIngredients from './Pages/ExploreFoodsByIngredients';
import ExploreDrinksByIngredients from './Pages/ExploreDrinksByIngredients';
import ExploreFoodsByArea from './Pages/ExploreFoodsByArea';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Meals } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas/:id" />
      <Route exact path="/bebidas/:id" />
      <Route path="/comidas/:id/in-progress" />
      <Route path="/bebidas/:id/in-progress" />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodsByIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksByIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoodsByArea } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ MadeRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
